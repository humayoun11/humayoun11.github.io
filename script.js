"use strict";
(() => {
 const email = "humayounkhatri@gmail.com";
 const menuToggle = document.getElementById("menu-toggle");
 const navLinks = document.getElementById("nav-links");
 const closeMenu = () => {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
 };
 menuToggle.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  navLinks.classList.toggle("open", open);
 });
 navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
 document.addEventListener("keydown", event => { if (event.key === "Escape") closeMenu(); });
 document.addEventListener("click", event => { if (!event.target.closest(".nav")) closeMenu(); });
 window.matchMedia("(min-width: 701px)").addEventListener("change", closeMenu);

 const projects = {
  clinicdesk: {
   title: "ClinicDesk", stack: "Laravel MVC · PHP · MySQL · Sanctum",
   description: "A personal clinic appointment project covering patient bookings, doctor schedules and clinic administration.",
   features: ["Patient, Doctor and Admin dashboards with role-specific access.", "Doctor and service directories, available appointment slots and schedule administration.", "Booking, rescheduling and cancellation using a shared transactional booking service.", "Versioned REST API, OpenAPI documentation, Postman collection and automated tests."],
   security: "Browser sessions and CSRF protection for the website; Sanctum bearer tokens for the API. Ownership policies, validation, relational constraints and booking transactions protect the workflow. The API uses Sanctum tokens, not JWT.",
   setup: "Download the repository and follow its README. Use PHP/Composer, Node and MySQL or MariaDB; configure an isolated database, apply migrations, seed fictional records, build assets and start the Laravel application.",
   note: "Personal demonstration with fictional clinic records. Medical records and payments are outside its scope.",
   repo: "https://github.com/humayoun11/clinicdesk"
  },
  schooldesk: {
   title: "SchoolDesk", stack: "ASP.NET MVC 5 · C# · .NET Framework 4.8 · SQL Server",
   description: "A personal school management application with browser workflows and a scoped backend API.",
   features: ["Admin, Teacher, Accountant, Parent and Student roles.", "Student admissions, class assignment, attendance and attendance history.", "Fee invoices, partial payments, printable receipts and overpayment checks.", "Exams, marks, results reports, account administration and audit logs."],
   security: "Cookie authentication and anti-forgery protection for MVC pages, with JWT bearer authentication for API requests. Current account state and role scopes are checked server-side. Password hashing, input validation, parameterized SQL and transactions support the implementation.",
   setup: "On Windows, install a supported .NET SDK, .NET Framework 4.8, SQL Server LocalDB and IIS Express. Follow the README: run scripts/Setup.ps1 -Demo, then scripts/Run.ps1. Open localhost:5080; local setup generates private demo login details.",
   note: "Personal portfolio implementation, separate from any former employer’s school system. Source and local setup instructions are available in the repository.",
   repo: "https://github.com/humayoun11/schooldesk-mvc"
  },
  "drivedesk-api": {
   title: "DriveDesk API", stack: "ASP.NET Web API 2 · C# · .NET Framework 4.8 · SQL Server",
   description: "A personal driving licence workflow API with role-scoped access and an interactive browser console.",
   features: ["Applicant profiles, drafts and Identity, Residence and EyeTest document references.", "Officer document verification and application approval or rejection.", "Driving test scheduling and result recording, followed by demo licence issuance.", "Admin account management, audit logs, browser console, OpenAPI and Postman collection."],
   security: "JWT signature, issuer, audience and lifetime validation, plus current user status and role checks. Revocation invalidates existing tokens. Applicant ownership checks, input DTOs, parameterized SQL and serializable workflow transactions enforce the process.",
   setup: "Use the same Windows/IIS Express/LocalDB tools as SchoolDesk. Follow the README: run scripts/Setup.ps1 -Demo, then scripts/Run.ps1. Open localhost:5090 and sign in using a generated local demo account. The separate database is DriveDeskDemo.",
   note: "Fictional licence workflow for demonstration. Document references are metadata; this is not a government licensing service or an RTA integration.",
   repo: "https://github.com/humayoun11/drivedesk-api"
  }
 };
 const dialog = document.getElementById("project-dialog");
 let trigger = null;
 const populateDialog = key => {
  const project = projects[key];
  if (!project) return;
  document.getElementById("dialog-title").textContent = project.title;
  document.getElementById("dialog-stack").textContent = project.stack;
  document.getElementById("dialog-description").textContent = project.description;
  document.getElementById("dialog-security").textContent = project.security;
  document.getElementById("dialog-setup").textContent = project.setup;
  document.getElementById("dialog-note").textContent = project.note;
  document.getElementById("dialog-repo").href = project.repo;
  const list = document.getElementById("dialog-features");
  list.replaceChildren();
  project.features.forEach(feature => { const item = document.createElement("li"); item.textContent = feature; list.appendChild(item); });
 };
 document.querySelectorAll("[data-project]").forEach(button => button.addEventListener("click", () => {
  populateDialog(button.dataset.project);
  trigger = button;
  dialog.showModal();
  document.getElementById("dialog-close").focus();
 }));
 document.getElementById("dialog-close").addEventListener("click", () => dialog.close());
 dialog.addEventListener("click", event => {
  const rect = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
 });
 dialog.addEventListener("close", () => { if (trigger) trigger.focus(); });

 const cards = Array.from(document.querySelectorAll(".project-card"));
 document.querySelectorAll(".filter").forEach(button => button.addEventListener("click", () => {
  const filter = button.dataset.filter;
  document.querySelectorAll(".filter").forEach(other => {
   const selected = other === button;
   other.setAttribute("aria-pressed", String(selected));
   other.classList.toggle("selected", selected);
  });
  let count = 0;
  cards.forEach(card => { card.hidden = filter !== "all" && card.dataset.stack !== filter; if (!card.hidden) count += 1; });
  document.getElementById("project-grid").classList.toggle("filtered", filter !== "all");
  document.getElementById("project-count").textContent = `${count} ${count === 1 ? "project" : "projects"}`;
 }));

 let toastTimer;
 const notify = message => {
  const toast = document.getElementById("toast");
  toast.textContent = message; toast.hidden = false;
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => { toast.hidden = true; }, 3500);
 };
 document.getElementById("copy-email").addEventListener("click", async () => {
  try {
   if (!navigator.clipboard || !window.isSecureContext) throw new Error("Clipboard unavailable");
   await navigator.clipboard.writeText(email);
   notify("Email address copied.");
  } catch {
   const range = document.createRange();
   const link = document.querySelector('.contact-row a[href="mailto:' + email + '"]');
   range.selectNodeContents(link);
   const selection = window.getSelection();
   selection.removeAllRanges(); selection.addRange(range);
   notify("Email selected. Press Ctrl+C or use your device’s Copy option.");
  }
 });
 document.getElementById("year").textContent = String(new Date().getFullYear());
 if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
   entries.forEach(entry => {
    if (entry.isIntersecting) navLinks.querySelectorAll('a[href^="#"]').forEach(link => link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id));
   });
  }, { rootMargin: "-15% 0px -60% 0px", threshold: 0 });
  ["projects", "expertise", "experience", "contact"].forEach(id => observer.observe(document.getElementById(id)));
 }
})();
