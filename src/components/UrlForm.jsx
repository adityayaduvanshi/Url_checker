import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';

const API_RATE_LIMIT = 3;
const API_RATE_LIMIT_PERIOD = 5 * 60 * 1000;

const UrlForm = () => {
  const { handleSubmit, control, register } = useForm();
  const [result, setResult] = useState(null);
  const [remainingApiCalls, setRemainingApiCalls] = useState(API_RATE_LIMIT);
  const [lastApiCallTimestamp, setLastApiCallTimestamp] = useState(0);

  const onSubmit = async (data) => {
    if (remainingApiCalls <= 0) {
      setResult(
        <div className="bg-red-500 py-3 px-2 rounded-md">
          <p className="text-sm sm:text-2xl">
            Rate limit exceeded. Please try again later.
          </p>
        </div>
      );
      return;
    }

    const now = Date.now();
    if (now - lastApiCallTimestamp < API_RATE_LIMIT_PERIOD) {
      setRemainingApiCalls((prev) => prev - 1);
    } else {
      setRemainingApiCalls(API_RATE_LIMIT - 1);
      setLastApiCallTimestamp(now);
    }

    try {
      switch (data.option) {
        case 'status':
          await checkStatus(data.url);
          break;
        case 'ssl':
          await checkSSL(data.url);
          break;
        case 'content':
          await checkContent(data.url);
          break;
        default:
          setResult(null);
          break;
      }
    } catch (error) {
      setResult(
        <div className="bg-red-500 py-3 px-2 rounded-md">
          <p className="text-sm sm:text-2xl">
            Error: Something went wrong. ({error.message})
          </p>
        </div>
      );
    }
  };

  const checkStatus = async (url) => {
    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        setResult(
          <div className="bg-green-500 py-3 px-2 rounded-md">
            <p className="text-sm sm:text-2xl">
              Success: URL does return 200 status code
            </p>
          </div>
        );
      } else {
        setResult(
          <div className="bg-red-500 py-3 px-2 rounded-md">
            <p className="text-sm sm:text-2xl">
              Error: URL returned a status code other than 200
            </p>
          </div>
        );
      }
    } catch (error) {
      setResult(
        <div className="bg-red-500 py-3 px-2 rounded-md">
          <p className="text-sm sm:text-2xl">
            Error: Unable to fetch URL ({error.message})
          </p>
        </div>
      );
    }
  };

  const checkSSL = async (url) => {
    const apiUrl = `https://check-ssl.p.rapidapi.com/sslcheck?domain=${url}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_XRAPID_APIKEY,
        'X-RapidAPI-Host': process.env.REACT_APP_RAPIDAPI_HOST,
      },
    };
    try {
      const response = await fetch(apiUrl, options);
      const result = await response.json();
      if (result.isvalidCertificate === true) {
        setResult(
          <div className="bg-green-500 py-3 px-2 rounded-md">
            <p className="text-sm sm:text-2xl">
              Success: SSL Certificate is valid for more {result.daysLeft} days
            </p>
          </div>
        );
      }
    } catch (error) {
      setResult(
        <div className="bg-red-500 py-3 px-2 rounded-md">
          <p className="text-sm sm:text-2xl">
            Error: Unable to verify SSL ({error.message})
          </p>
        </div>
      );
    }
  };

  const checkContent = async (url) => {
    const cleanUrl = url.replace(/\/$/, '');
    try {
      const response = await axios.head(`${cleanUrl}/robots.txt`);
      setResult(
        response.status === 200 ? (
          <div className="bg-green-500 py-3 px-2 rounded-md">
            <p className="text-sm sm:text-2xl">
              Success: robots.txt file exists on the server
            </p>
          </div>
        ) : (
          'Error: robots.txt file does not exist'
        )
      );
    } catch (error) {
      setResult(
        <div className="bg-red-500 py-3 px-2 rounded-md">
          <p className="text-sm sm:text-2xl">
            Error: Unable to fetch robots.txt ({error.message})
          </p>
        </div>
      );
    }
  };

  return (
    <div className="mx-auto flex items-center flex-col gap-2 justify-center w-full">
      <form
        className="flex flex-col  sm:flex-row gap-2 sm:items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="text-xl">
          URL:
          <Controller
            name="url"
            control={control}
            rules={{
              required: 'URL is required',
              pattern: {
                value: /^(ftp|http|https):\/\/[^ "]+$/,
                message: 'Invalid URL format',
              },
            }}
            render={({ field, fieldState }) => (
              <>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...field}
                  type="text"
                  placeholder="https://www.google.com"
                />
                {fieldState.error && (
                  <p className="text-xs text-red-500">
                    {fieldState.error.message}
                  </p>
                )}
              </>
            )}
          />
        </label>
        <div>
          <label>
            Options:
            <select
              className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register('option')}
            >
              <option value="status">Check for a 200 Status</option>
              <option value="ssl">SSL Certificate Verification</option>
              <option value="content">Content of robots.txt</option>
            </select>
          </label>
        </div>

        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-6 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          type="submit"
        >
          Submit
        </button>
      </form>
      {result && <div className="my-2">{result}</div>}
    </div>
  );
};

export default UrlForm;
