# Publishing to npm

Follow these steps to publish the updated version of the Angular wizard component to npm:

1. **Build the project**: Ensure that the project is built and all necessary files are generated. Run the following command to build the project:
   ```sh
   npm run build
   ```

2. **Update the version**: Update the version number in `package.json` to the new version. For example, if the current version is `1.2.0`, update it to `1.2.1` or `1.3.0` depending on the type of changes made (patch or minor).

3. **Login to npm**: If you are not already logged in to npm, run the following command and enter your npm credentials:
   ```sh
   npm login
   ```

4. **Publish to npm**: Run the following command to publish the package to npm:
   ```sh
   npm publish
   ```

5. **Verify the publication**: Verify that the package has been published successfully by checking the npm registry or running the following command:
   ```sh
   npm info angularts-wizard
   ```

6. **Tag the release**: Create a new tag for the release in the GitHub repository. Run the following commands to create and push the tag:
   ```sh
   git tag v1.2.1
   git push origin v1.2.1
   ```

7. **Update the documentation**: Ensure that the documentation is up to date with the new version and any new features added. Update the `README.md` and any other relevant documentation files.

8. **Announce the release**: Announce the release to the community by creating a release note on the GitHub repository and sharing it on relevant channels (e.g., social media, forums).

By following these steps, you can successfully publish the updated version of the Angular wizard component to npm.
