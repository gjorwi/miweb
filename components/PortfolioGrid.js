"use client";

import { ArrowUpRight, Layers } from "lucide-react";
import { useEffect, useState } from "react";
import { projects as fallbackProjects } from "../lib/projects.js";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

function ProjectPreview({ tone }) {
  return (
    <div className="project-preview" data-tone={tone} aria-hidden="true">
      <div className="preview-topbar">
        <span className="preview-brand"><i /> workspace</span>
        <span className="preview-avatar">JG</span>
      </div>
      <div className="preview-layout">
        <div className="preview-sidebar">
          <i className="sidebar-active" />
          <i />
          <i />
          <i />
          <i className="sidebar-spacer" />
          <i />
        </div>
        <div className="preview-main">
          <div className="preview-heading">
            <span />
            <i />
          </div>
          <div className="preview-stats">
            <span><i /><b /><small /></span>
            <span><i /><b /><small /></span>
            <span><i /><b /><small /></span>
          </div>
          <div className="preview-chart">
            <div className="chart-labels"><i /><i /><i /></div>
            <svg viewBox="0 0 320 90" preserveAspectRatio="none">
              <path d="M0 71 C25 68 31 45 58 53 S91 73 119 43 S157 53 185 32 S219 48 243 23 S282 42 320 8" />
              <path className="chart-fill" d="M0 71 C25 68 31 45 58 53 S91 73 119 43 S157 53 185 32 S219 48 243 23 S282 42 320 8 L320 90 L0 90 Z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioGrid() {
  const [projects, setProjects] = useState(fallbackProjects);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProjects() {
      try {
        const response = await fetch(`${API_URL}/api/projects`, {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!response.ok) return;
        const data = await response.json();
        if (Array.isArray(data.projects)) setProjects(data.projects);
      } catch (error) {
        if (error.name !== "AbortError") {
          // La grilla conserva los proyectos de ejemplo si la API aún no está activa.
        }
      }
    }

    loadProjects();
    return () => controller.abort();
  }, []);

  return (
    <div className="project-grid">
      {projects.map((project, index) => (
        <article className="project-card" key={project.id}>
          <div className="project-art-wrap">
            <ProjectPreview tone={project.tone || ["mint", "violet", "blue"][index % 3]} />
            <span className="project-number">{project.number || String(index + 1).padStart(2, "0")}</span>
            <span className="project-placeholder-label"><i /> CASO EDITABLE</span>
          </div>

          <div className="project-content">
            <div className="project-category-row">
              <span className="project-category">{project.category}</span>
              <Layers size={15} strokeWidth={1.7} />
            </div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="project-bottom-row">
              <div className="project-tags">
                {(project.stack || []).map((item) => <span key={item}>{item}</span>)}
              </div>
              {project.url ? (
                <a className="project-link" href={project.url} target="_blank" rel="noreferrer" aria-label={`Ver ${project.title}`}>
                  <ArrowUpRight size={17} />
                </a>
              ) : (
                <span className="project-link project-link-muted" aria-label="Añadir enlace al proyecto">
                  <ArrowUpRight size={17} />
                </span>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
