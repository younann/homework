import React, { useEffect, useState, useCallback } from "react";
import { Input, Button, message } from "antd";
import { updateUser } from "../services/apiService";
import { userStore } from "../stores/userStore";
import { observer } from "mobx-react-lite";

const Settings = observer(() => {
  const [email, setEmail] = useState<string>(userStore.email ?? "");
  const [displayName, setDisplayName] = useState<string>(
    userStore.displayName ?? ""
  );

  useEffect(() => {
    setEmail(userStore.email ?? "");
    setDisplayName(userStore.displayName ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userStore.email, userStore.displayName]);

  const handleUpdate = useCallback(() => {
    if (userStore.userId && email && displayName) {
      updateUser({ email, displayName }, userStore.userId)
        .then((response) => {
          userStore.setUser(response.data);
          message.success("Profile updated successfully.");
        })
        .catch((error) => {
          console.error("Failed to update profile:", error);
          message.error("Failed to update profile.");
        });
    }
  }, [email, displayName]);

  return userStore.isLoggedIn ? (
    <div>
      <h2>Settings</h2>
      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        style={{ marginBottom: 10 }}
        disabled
      />
      <Input
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        placeholder="Display Name"
        style={{ marginBottom: 10 }}
      />
      <Button type="primary" onClick={handleUpdate}>
        Save Changes
      </Button>
    </div>
  ) : (
    <div>Log in to view your Settings</div>
  );
});

export default Settings;
