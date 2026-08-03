"use client";

import { useEffect, useState } from "react";
import type { PermissionsMap, ResourceKey, Action } from "./permissions";
import { can } from "./permissions";

export interface AdminIdentity {
  userId: string | null;
  email: string | null;
  name: string | null;
  role: string | null;
  permissions: PermissionsMap;
  loading: boolean;
}

const initialIdentity: AdminIdentity = {
  userId: null,
  email: null,
  name: null,
  role: null,
  permissions: {},
  loading: true,
};

export function useAdminIdentity(): AdminIdentity {
  const [state, setState] = useState<AdminIdentity>(initialIdentity);

  useEffect(() => {
    let active = true;
    fetch("/api/admin/auth")
      .then((res) => res.json())
      .then((data) => {
        if (!active) return;
        setState({
          userId: data.userId ?? null,
          email: data.email ?? null,
          name: data.name ?? null,
          role: data.role ?? null,
          permissions: data.permissions ?? {},
          loading: false,
        });
      })
      .catch(() => {
        if (active) setState((s) => ({ ...s, loading: false }));
      });
    return () => {
      active = false;
    };
  }, []);

  return state;
}

export function useCan(resource: ResourceKey, action: Action): boolean {
  const { permissions } = useAdminIdentity();
  return can(permissions, resource, action);
}
