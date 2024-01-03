import React,{ useState } from 'react';

const SidebarLinkGroup = ({ children, activeCondition }) => {
  const [open, setOpen] = useState(activeCondition);

  const handleClick = () => {
    setOpen(!open);
  };

  return React.createElement('li', null, children(handleClick, open));
};

export default SidebarLinkGroup;
