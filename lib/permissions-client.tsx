"use client";

import { createContext, useContext, ReactNode } from "react";
import type { PermissionsMap, ResourceKey, Action } from "./permissions";
import { can } from "./permissions";

interface AdminIdentity {
  userId: string | null;
  email: string | null;
  name: string | null;
  role: string | null;
  permissions: PermissionsMap;
  loading: boolean;
}

const defaultIdentity: AdminIdentity = {
  userId: null,
  email: null,
  name: null,
  role: null,
  permissions: {},
  loading: true,
};

const AdminIdentityContext = createContext<AdminIdentity>(defaultIdentity);

export function AdminIdentityProvider({
  value,
  children,
}: {
  value: AdminIdentity;
  children: ReactNode;
}) {
  return (
    <AdminIdentityContext.Provider value={value}>
      {children}
    </AdminIdentityContext.Provider>
      );
}

export function useAdminIdentity(): AdminIdentity {
  return useContext(AdminIdentityContext);
}

export function useCan(resource: ResourceKey, action: Action): boolean {
  const { permissions } = useAdminIdentity();
  return can(permissions, resource, action);
}

export type { AdminIdentity };
