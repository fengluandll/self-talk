import React, { FC, useEffect, useState } from "react";
import { ApplicationInitializer } from "../../application/application-initializer";
import { SignInManager } from "../../application/sign-in-manager";
import { SignIn } from "./SignIn";

interface IProps {
  applicationInitializer: ApplicationInitializer;
  signInManager: SignInManager;
}

export const App: FC<IProps> = ({
  signInManager,
  applicationInitializer
}: IProps) => {
  const [initialized, setInitialized] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    (async () => {
      if (!initialized) {
        const { signedIn } = await applicationInitializer.initialize();
        setSignedIn(signedIn);
        setInitialized(true);
      }
    })();
  });

  if (!initialized) {
    return <div>Wait a minute ...</div>;
  }

  return signedIn ? (
    <div>Hello, world!</div>
  ) : (
    <SignIn
      signIn={async () => {
        setSignedIn(await signInManager.signIn());
      }}
    />
  );
};
