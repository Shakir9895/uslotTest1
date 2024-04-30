import { useCallback, useEffect } from 'react';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hook';
//
import { useAuthContext } from '../hooks';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function GuestGuard({ children }: Props) {
  const router = useRouter();

  const {isLogged} = useSelector((state:RootState)=>state.checkout.auth);
  console.log(isLogged)




  // const { authenticated } = useAuthContext();

  // const check = useCallback(() => {
  //   if (authenticated) {
  //     router.replace(paths.dashboard.root);
  //   }
  // }, [authenticated, router]);

  //---------------------------------------------


  const check = useCallback(() => {
    if (isLogged) {
      router.replace(paths.dashboard.root);
    }
  }, [isLogged, router]);


  

  useEffect(() => {
    check();
  }, [check]);

  return <>{children}</>;
}
