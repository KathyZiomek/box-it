import { Card } from "primereact/card";

const UserSettingsPage = () => {
  let header = (
    <div>
      <h1>
        <i
          className="pi pi-exclamation-triangle"
          style={{ fontSize: "1em" }}
        ></i>
        User Settings
      </h1>
    </div>
  );

  let body = (
    <div>
      <p>
        This page is currently in construction. Please visit a different page
        using the navigation bar above.
      </p>
    </div>
  );

  return (
    <Card>
      {header}
      {body}
    </Card>
  );
};

export default UserSettingsPage;
