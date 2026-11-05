"use client";

import { useEffect, useState } from "react";
import { personal as staticPersonal } from "./config";

export type PersonalType = typeof staticPersonal;

export function usePersonal(): PersonalType {
  const [personal, setPersonal] = useState<PersonalType>(staticPersonal);

  useEffect(() => {
    let active = true;
    fetch("/api/owner-data")
      .then((res) => res.json())
      .then((data) => {
        if (active && data?.personal) {
          setPersonal((prev) => ({
            ...prev,
            ...data.personal,
            social: {
              ...prev.social,
              ...(data.personal.social || {}),
            },
          }));
        }
      })
      .catch(() => {
        // Fallback to static config
      });

    return () => {
      active = false;
    };
  }, []);

  return personal;
}

