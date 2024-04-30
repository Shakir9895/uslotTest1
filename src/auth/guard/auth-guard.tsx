import { useEffect, useCallback, useState } from 'react';
// routes
import axios from 'axios';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hook';
//
import { useAuthContext } from '../hooks';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';


// ----------------------------------------------------------------------

const loginPaths: Record<string, string> = {
  jwt: paths.auth.jwt.login,
  auth0: paths.auth.auth0.login,
  amplify: paths.auth.amplify.login,
  firebase: paths.auth.firebase.login,
};

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: Props) {


  const { isLogged } = useSelector((state: RootState) => state.checkout.auth);

  console.log(isLogged)


  const router = useRouter();

  const { authenticated, method } = useAuthContext();



  const [checked, setChecked] = useState(false);

  // const check = useCallback(() => {
  //   if (!authenticated) {
  //     const searchParams = new URLSearchParams({ returnTo: window.location.pathname }).toString();

  //     const loginPath = loginPaths[method];

  //     const href = `${loginPath}?${searchParams}`; // auth/jwt/login?return ...
  //     // window.alert(href)

  //     router.replace(href);

  //   } else {
  //     setChecked(true);
  //   }
  // }, [authenticated, method, router]);



  //-------------------------------------//


  const check = useCallback(() => {
    if (!isLogged) { // true
      // window.alert("TRUE")
      const href = '/auth/jwt/login';
      router.replace(href);

    } else {
      setChecked(true);
    }
  }, [isLogged, router]);




  useEffect(() => {
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged]);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
}
