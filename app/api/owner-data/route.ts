import { NextResponse } from "next/server";
import { skills } from "@/lib/config";
import {
  getCustomData,
  saveCustomData,
  getAllAchievements,
  getAllManualProjects,
  getEffectivePersonal,
  savePersonalData,
} from "@/lib/store";

export async function GET() {
  return NextResponse.json({
    personal: getEffectivePersonal(),
    achievements: getAllAchievements(),
    skills,
    projects: getAllManualProjects(),
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, item, id, type, personal: updatedPersonal } = body;
    const store = getCustomData();

    if (action === "update_personal") {
      if (!updatedPersonal || typeof updatedPersonal !== "object") {
        return NextResponse.json({ error: "Invalid personal payload" }, { status: 400 });
      }
      const saved = savePersonalData(updatedPersonal);
      return NextResponse.json({
        success: true,
        personal: saved,
      });
    }

    if (action === "add_achievement") {
      const newAchievement = {
        ...item,
        id: item.id || `custom-${Date.now()}`,
        index: (store.achievements.length + 3).toString().padStart(2, "0"),
      };
      store.achievements.push(newAchievement);
      saveCustomData(store);
      return NextResponse.json({ success: true, achievements: getAllAchievements() });
    }

    if (action === "add_project") {
      const newProject = {
        ...item,
        id: item.id || `custom-project-${Date.now()}`,
        order: 99,
        featured: false,
      };
      store.projects.push(newProject);
      saveCustomData(store);
      return NextResponse.json({ success: true, projects: getAllManualProjects() });
    }

    if (action === "delete_item") {
      if (type === "achievement") {
        store.achievements = store.achievements.filter((a) => a.id !== id);
      } else if (type === "project") {
        store.projects = store.projects.filter((p) => p.id !== id);
      }
      saveCustomData(store);
      return NextResponse.json({
        success: true,
        achievements: getAllAchievements(),
        projects: getAllManualProjects(),
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err) {
    console.error("API error in owner-data:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
