import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div>
            <Link to="/Home">Home</Link><br />
            <Link to="/Todos">todos</Link><br />
            <Link to="/Posts">posts</Link><br />
            <Link to="/Albums">albums</Link><br />
            <Link to="/">logout</Link>
      </div>

      <Outlet />
    </>
  )
};

export default Layout;