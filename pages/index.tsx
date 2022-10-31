import Link from 'next/link'
import styles from '../styles/Home.module.css'

// This type represents the props + defaultProps of the above component
// See: https://stackoverflow.com/questions/43230765/typescript-react-access-component-property-types/55005902#comment107210124_55005902
type ButtonPropsType = JSX.LibraryManagedAttributes<
  {},
  React.ComponentProps<any>
>

// Lazy load this component to avoid pulling in huge JS bundles when not
// necessary
// @ts-ignore
export default function Home({ apps }) {
  return (
    <main className={styles.main}>
      { apps.map((app) => {
        return (
          <Link key={app.id} href={`/apps/${app.id}`}>
            {app.name}
          </Link>
        )
      }) }
    </main>
  )
}


export async function getServerSideProps() {
  return {
    props: {
      apps: [{
        id: "files",
        name: "Files",
      }]
    },
  }
}