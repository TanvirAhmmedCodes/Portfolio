import fs from "fs";
import path from "path";
import { Achievement, achievements as defaultAchievements, personal as defaultPersonal } from "./config";
import { Project, manualProjects as defaultProjects } from "./projects";

export type PersonalData = typeof defaultPersonal;

interface CustomData {
  achievements: Achievement[];
  projects: Project[];
  personal?: Partial<PersonalData>;
}

const STORE_PATH = path.join(process.cwd(), "lib", "custom-store.json");
const TMP_PATH = path.join("/tmp", "custom-store.json");

export function getCustomData(): CustomData {
  try {
    if (fs.existsSync(TMP_PATH)) {
      const content = fs.readFileSync(TMP_PATH, "utf-8");
      return JSON.parse(content);
    }
    if (fs.existsSync(STORE_PATH)) {
      const content = fs.readFileSync(STORE_PATH, "utf-8");
      return JSON.parse(content);
    }
  } catch (err) {
    console.error("Failed to read custom store:", err);
  }
  return { achievements: [], projects: [] };
}

export function saveCustomData(data: CustomData) {
  try {
    fs.writeFileSync(STORE_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch {
    try {
      fs.writeFileSync(TMP_PATH, JSON.stringify(data, null, 2), "utf-8");
    } catch (err) {
      console.error("Failed to save custom store:", err);
    }
  }
}

export function getEffectivePersonal(): PersonalData {
  const custom = getCustomData();
  if (!custom.personal) return defaultPersonal;
  return {
    ...defaultPersonal,
    ...custom.personal,
    social: {
      ...defaultPersonal.social,
      ...(custom.personal.social || {}),
    },
  };
}

export function savePersonalData(updated: Partial<PersonalData>): PersonalData {
  const store = getCustomData();
  store.personal = {
    ...(store.personal || {}),
    ...updated,
    social: {
      ...(defaultPersonal.social),
      ...(store.personal?.social || {}),
      ...(updated.social || {}),
    },
  };
  saveCustomData(store);
  return getEffectivePersonal();
}

export function getAllAchievements(): Achievement[] {
  const custom = getCustomData();
  const merged = [...defaultAchievements, ...custom.achievements];
  return merged.map((item, idx) => ({
    ...item,
    index: (idx + 1).toString().padStart(2, "0"),
  }));
}

export function getAllManualProjects(): Project[] {
  const custom = getCustomData();
  return [...defaultProjects, ...custom.projects];
}

