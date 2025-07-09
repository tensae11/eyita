## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Prerequisites

Before deploying, ensure you have the following accounts and configurations set up:

- **Firebase Account**: Your project uses Firebase for authentication and database services.
- **Cloudinary Account**: Your project uses Cloudinary for video hosting.

### Step-by-Step Deployment (Web UI)

1.  **Fork the Repository**: Fork this repository to your GitHub account.

2.  **Vercel Project Setup**:

    - Go to your Vercel dashboard and click on "Add New... > Project".
    - Import the forked repository from your GitHub account.
    - Vercel will automatically detect that it's a Next.js project and configure the build settings.

3.  **Environment Variables**:
    - In the Vercel project settings, navigate to the "Environment Variables" section.
    - Add the following environment variables:
    - Copy the **.env.example** file to **.env** file and paste if you want to check locally

| Name                                       | Description                                                                      |
| :----------------------------------------- | :------------------------------------------------------------------------------- |
| `GOOGLE_PROJECT_ID`                        | Your Firebase project ID.                                                        |
| `GOOGLE_CLIENT_EMAIL`                      | Your Firebase service account client email.                                      |
| `GOOGLE_PRIVATE_KEY`                       | Your Firebase service account private key.                                       |
| `CLOUDINARY_CLOUD_NAME`                    | Your Cloudinary cloud name.                                                      |
| `CLOUDINARY_API_KEY`                       | Your Cloudinary API key.                                                         |
| `CLOUDINARY_API_SECRET`                    | Your Cloudinary API secret.                                                      |
| `JWT_SECRET`                               | A secret key for signing JWT tokens.                                             |
| `NEXT_PUBLIC_FIREBASE_API_KEY`             | Your Firebase project's web API key.                                             |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`         | Your Firebase project's auth domain.                                             |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID`          | Your Firebase project ID.                                                        |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`      | Your Firebase project's storage bucket.                                          |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Your Firebase project's messaging sender ID.                                     |
| `NEXT_PUBLIC_FIREBASE_APP_ID`              | Your Firebase project's app ID.                                                  |
| `NEXT_PUBLIC_API_URL`                      | The URL of your deployed application (e.g., `https://your-app-name.vercel.app`). |

4.  **Deploy**:

    - After adding the environment variables, click the "Deploy" button.
    - Vercel will build and deploy your application.

5.  **Access Your Site**:
    - Once the deployment is complete, you can access your live site at the URL provided by Vercel.

### Command-Line Deployment

Alternatively, you can deploy the application from the command line using the Vercel CLI.

1.  **Install Vercel CLI**:

    ```bash
    npm i -g vercel
    ```

2.  **Link Project**:
    Navigate to the project's root directory and link it to your Vercel account:

    ```bash
    vercel link
    ```

3.  **Set Environment Variables**:
    Add the environment variables listed above using the `vercel env add` command:

    ```bash
    vercel env add GOOGLE_PROJECT_ID <value>
    vercel env add GOOGLE_CLIENT_EMAIL <value>
    vercel env add GOOGLE_PRIVATE_KEY <value>
    # ... and so on for all the required variables
    ```

4.  **Deploy to Production**:
    Once all environment variables are set, deploy the application to production:
    ```bash
    vercel --prod
    ```
