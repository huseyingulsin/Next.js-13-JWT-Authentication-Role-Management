export default async function PanelPage() {
  const isLoggedIn = await checkIsLoggedIn();
  return <h1>Very protected panel page</h1>;
}

