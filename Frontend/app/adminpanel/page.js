"use client";

import Adminpanel from "../components/adminpanel/adminpanel";
import { useSession } from "next-auth/react";

const AdminpanelSection = () => {
  const session = useSession();

  return session &&
    session.data &&
    session.data.user &&
    session.data.user.email &&
    session.data.user.email == process.env.NEXT_PUBLIC_ADMIN_PANEL_ACCESS ? (
    <Adminpanel />
  ) : (
    <p style={{ textAlign: "center", marginTop: "130px" }}>
      only admins have access to this section
    </p>
  );
};

export default AdminpanelSection;
