import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

function normalizeEnvValue(value?: string) {
	return value?.trim() || "";
}

function stripWrappingQuotes(value: string) {
	if (
		(value.startsWith('"') && value.endsWith('"')) ||
		(value.startsWith("'") && value.endsWith("'"))
	) {
		return value.slice(1, -1);
	}

	return value;
}

function parseEnvFile(fileContent: string) {
	const values: Record<string, string> = {};

	for (const line of fileContent.split(/\r?\n/)) {
		const trimmed = line.trim();

		if (!trimmed || trimmed.startsWith("#")) {
			continue;
		}

		const separatorIndex = trimmed.indexOf("=");

		if (separatorIndex <= 0) {
			continue;
		}

		const key = trimmed.slice(0, separatorIndex).trim();
		const rawValue = trimmed.slice(separatorIndex + 1).trim();

		values[key] = stripWrappingQuotes(rawValue);
	}

	return values;
}

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(currentDir, "..", "..");
const envFiles = [".env", ".env.local"];
const loadedValues: Record<string, string> = {};

for (const envFile of envFiles) {
	const envFilePath = path.join(projectRoot, envFile);

	if (!fs.existsSync(envFilePath)) {
		continue;
	}

	Object.assign(loadedValues, parseEnvFile(fs.readFileSync(envFilePath, "utf8")));
}

for (const [key, value] of Object.entries(loadedValues)) {
	if (!normalizeEnvValue(process.env[key])) {
		process.env[key] = value;
	}
}