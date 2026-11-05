const GITHUB_API = "https://api.github.com";
export const GITHUB_USERNAME = "TanvirAhmmedCodes";
const CACHE_TTL = 5 * 60 * 1000;

interface CacheEntry<T> {
  data: T;
  ts: number;
}

const cache = new Map<string, CacheEntry<unknown>>();

async function fetchJSON<T>(url: string): Promise<T> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "tanvir-portfolio-app",
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(url, { headers, next: { revalidate: 300 } });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`GitHub API ${res.status}: ${text.slice(0, 100)}`);
  }
  return res.json() as T;
}

async function cached<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
  const now = Date.now();
  const hit = cache.get(key);
  if (hit && now - hit.ts < CACHE_TTL) return hit.data as T;
  try {
    const data = await fetcher();
    cache.set(key, { data, ts: now });
    return data;
  } catch (err) {
    if (hit) return hit.data as T;
    throw err;
  }
}

export interface GithubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  html_url: string;
  location: string | null;
  company: string | null;
  twitter_username: string | null;
  blog: string | null;
}

export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  pushed_at: string;
  created_at: string;
  fork: boolean;
  archived: boolean;
  topics: string[];
  size: number;
}

export interface GithubEvent {
  id: string;
  type: string;
  repo: {
    name: string;
    url: string;
  };
  created_at: string;
  payload?: {
    commits?: Array<{ message: string; sha: string }>;
  };
}

export async function getGithubUser(): Promise<GithubUser> {
  return cached("user", () => fetchJSON<GithubUser>(`${GITHUB_API}/users/${GITHUB_USERNAME}`));
}

export async function getRepos(): Promise<GithubRepo[]> {
  const repos = await cached("repos", () =>
    fetchJSON<GithubRepo[]>(
      `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100&type=owner`,
    ),
  );
  return repos.filter((r) => !r.fork && !r.archived);
}

export async function getPublicEvents(): Promise<GithubEvent[]> {
  try {
    return await cached("events", () =>
      fetchJSON<GithubEvent[]>(`${GITHUB_API}/users/${GITHUB_USERNAME}/events/public?per_page=10`),
    );
  } catch {
    return [];
  }
}
