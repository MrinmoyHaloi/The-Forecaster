import { error } from "@sveltejs/kit";

/** @type {import('@sveltejs/kit').PageLoad} */
export async function load() {
    throw error(500, "Please provide a city name");
}
