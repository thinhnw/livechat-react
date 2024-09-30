import Sidebar from "../components/SideBar";
import PropTypes from 'prop-types';

const MainLayout = ({ children }) => {
  return (
    <div className="flex h-full">
      <aside className="w-1/6 border-r border-gray-300">
        <Sidebar />
      </aside>
      <div className="w-5/6 flex flex-col">{children}</div>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
