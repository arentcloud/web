import dynamic from 'next/dynamic'
import { useRouter } from 'next/router';
import { Suspense, useMemo } from 'react'

// This type represents the props + defaultProps of the above component
// See: https://stackoverflow.com/questions/43230765/typescript-react-access-component-property-types/55005902#comment107210124_55005902
type ButtonPropsType = JSX.LibraryManagedAttributes<{}, React.ComponentProps<any>>

// Lazy load this component to avoid pulling in huge JS bundles when not
// necessary
// @ts-ignore
export default function App({ appId }) {

  const router = useRouter();

  const AppComponent = useMemo(() => {

    return dynamic<ButtonPropsType>(
      () => import(`../../app-files/${appId}/index.tsx`).then((mod) => mod.default),
      { ssr: false }
    );
  }, [router.query]);

  return (
    <main>
      <Suspense fallback="Loading...">
        <AppComponent user="100" />
      </Suspense>
    </main>
  )
}

export async function getServerSideProps({ params }) {
  return {
    props: {
      appId: params.app_id,
    },
  }
}