import type { APIRoute } from "astro";

export const GET: APIRoute = () =>
    new Response(`
        ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIBGZv4qC9Cba28xkG9NxIMP917YRBarCq6dTjmnSaOWo #ssh.id - @mcquadej
        ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIMUrbcX1HbEx2BPU86SRbO1AWYM1ca8V8iUy5esAj+mD #ssh.id - @mcquadej
        ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIK3tKAlcY5rXWMT5gLWPsTTavDhhxwAderusEj1dJm+Z #ssh.id - @mcquadej

        ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIGl1rOirJxdqYOIuSt+pUIH2ZZpvNIm2Pzu694Eq5Vqf homelab-backup
        ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIFg9jq00kdCG5wBLyeyYSbSyKMTfsu/XgBSZRLlZ6EvA vps-backup
    `, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
        },
    });