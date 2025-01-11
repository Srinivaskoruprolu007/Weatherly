import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <header></header>
      {children}
      <footer></footer>
    </div>
  );
};

export default Layout;
