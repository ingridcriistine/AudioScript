import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
      return [
        {
          source: "/login",
          destination: "/login"
        },
        {
          source: "/home",
          destination: "/home"
        },
        {
          source: "/historico",
          destination: "/historico"
        },
        {
          source: "/arqvSecreto",
          destination: "/arqvSecreto"
        },
        {
          source: "/colaboradores",
          destination:"/colaboradores"
        }
      ];
  }
};

export default nextConfig;
