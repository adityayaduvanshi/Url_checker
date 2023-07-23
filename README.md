
# URLGuardian

URLGuardian is a web application built using React that allows users to check the health status of a given website. The application performs three important checks on the provided URL: checking the HTTP status code (whether it returns 200 or not), verifying the validity of the SSL certificate, and determining if the website has a robots.txt file.


## Live Link

https://urlguardian.vercel.app


## Features

- **URL HTTP Status Check:**  The user can input a website URL into the application, and with the click of a button, the application sends a request to the provided URL to check if it returns a 200 status code. A successful response of 200 indicates that the website is accessible and working fine.
- **SSL Certificate Validation:** Security is paramount on the internet, and SSL certificates play a vital role in ensuring secure connections between the user's browser and the website. The application checks whether the SSL certificate of the provided URL is valid, ensuring that the website is employing encryption and data transmission security.
- **robots.txt Presence Check:** The robots.txt file is used by web crawlers and search engine bots to understand which parts of a website they are allowed to crawl and index. The application scans the provided website for the presence of a robots.txt file and informs the user whether it exists or not.
- **User-Friendly Interface:** The application provides a clean and intuitive user interface, allowing users to easily enter the website URL they want to check and view the results of the health check in a straightforward and understandable manner.
- **Responsive Design:** The website health checker is designed to be responsive and compatible with various devices and screen sizes, making it accessible to users on both desktop and mobile platforms.


## Future Enhancements:

To further enhance the capabilities of the Website Health Checker, the following features can be considered for future development:

1. **Performance Check:** Adding a feature to analyze the website's performance metrics, such as page load time, to help users understand the website's speed and responsiveness.

2. **Mobile-Friendliness Check:** Incorporating a check to evaluate if the website is mobile-friendly and displays correctly on different mobile devices.

3. **Additional SSL Details:** Providing more comprehensive SSL certificate details, such as the certificate issuer, expiration date, and encryption strength.

4. **Malware Detection:** Integrating a malware scanning feature to alert users if the website shows signs of being compromised.

Overall, the URLGuardian built with React offers a valuable tool for users to assess the health and security of websites they are interested in or responsible for, ensuring a safer and smoother browsing experience on the internet.
## Author

- [adityayaduvanshi](https://adityayads.vercel.app)

