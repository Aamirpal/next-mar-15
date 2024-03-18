import React from "react";

interface RootLayoutProps {
  children: React.ReactNode;
}

const AppBody = ({ appBody }: RootLayoutProps) => {
  return <main className="drawer-content">{appBody}</main>;
};

export default AppBody;
