import React from "react";
import { createRoot } from "react-dom/client";

// ─── KREDENSIAL LOGIN (ganti sesuai kebutuhan) ────────────────────────────────
const VALID_CREDENTIALS = [
  { username: "admin", password: "bps1223" },
  { username: "operator", password: "pokja2026" }
];
import {
  ArrowUpRight,
  Bell,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Clock,
  Database,
  FileText,
  FolderOpen,
  Globe2,
  Home,
  ImageUp,
  LayoutGrid,
  LockKeyhole,
  LogIn,
  LogOut,
  Megaphone,
  Pencil,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  User,
  UserRound,
  UsersRound,
  X
} from "lucide-react";
import "./styles.css";

const iconOptions = {
  grid: LayoutGrid,
  document: FileText,
  book: BookOpen,
  people: UsersRound,
  briefcase: BriefcaseBusiness,
  database: Database,
  globe: Globe2,
  shield: ShieldCheck
};

const logoChoices = [
  { value: "grid", label: "Grid", icon: LayoutGrid },
  { value: "document", label: "Dokumen", icon: FileText },
  { value: "book", label: "Buku", icon: BookOpen },
  { value: "people", label: "Pegawai", icon: UsersRound },
  { value: "briefcase", label: "Kerja", icon: BriefcaseBusiness },
  { value: "database", label: "Data", icon: Database },
  { value: "globe", label: "Web", icon: Globe2 },
  { value: "shield", label: "Admin", icon: ShieldCheck }
];

const logoColorChoices = [
  { value: "blue", label: "Biru" },
  { value: "green", label: "Hijau" },
  { value: "orange", label: "Oranye" },
  { value: "slate", label: "Gelap" }
];

const apps = [
];

const workMenus = [
  { key: "dashboard", label: "Dashboard", icon: Home, enabled: true },
  { key: "aplikasi", label: "Aplikasi", icon: LayoutGrid, enabled: true },
  { key: "kinerja", label: "Kinerja", icon: ClipboardList, enabled: false }, // ← ganti true untuk aktifkan
  { key: "pengumuman", label: "Pengumuman", icon: Megaphone, enabled: false }, // ← ganti true untuk aktifkan
  { key: "dokumen", label: "Dokumen", icon: FolderOpen, enabled: false }, // ← ganti true untuk aktifkan
  { key: "profil", label: "Profil", icon: UserRound, enabled: true },
  { key: "admin", label: "Admin", icon: Settings, enabled: true }
];

const summaryCards = [
  { label: "Agenda Hari Ini", value: "6", icon: CalendarDays, tone: "blue" },
  { label: "Kegiatan Selesai", value: "18", icon: CheckCircle2, tone: "green" },
  { label: "Dokumen Baru", value: "12", icon: FileText, tone: "orange" },
  { label: "Notifikasi", value: "4", icon: Bell, tone: "slate" }
];

const agendaItems = [
  { time: "08.00", title: "Briefing pelaksanaan kegiatan rutin", meta: "Ruang rapat utama" },
  { time: "10.00", title: "Monitoring layanan PST online", meta: "Tim pelayanan" },
  { time: "14.00", title: "Rekap progres SKP dan laporan harian", meta: "Subbag umum" }
];

const announcements = [
  {
    title: "Pengisian SKP harian minggu ini ditutup Jumat pukul 16.00",
    tag: "Kinerja",
    date: "2 Mei 2026"
  },
  {
    title: "Koordinasi persiapan Sensus Ekonomi dilakukan melalui ruang Community BPS",
    tag: "Kegiatan",
    date: "1 Mei 2026"
  },
  {
    title: "Template surat tugas terbaru tersedia di menu Dokumen",
    tag: "Administrasi",
    date: "30 April 2026"
  }
];

const documents = [
  { name: "Template Surat Tugas", type: "DOCX", owner: "Subbag Umum" },
  { name: "SOP Pelayanan Statistik Terpadu", type: "PDF", owner: "PST" },
  { name: "Pedoman Input Kinerja Harian", type: "PDF", owner: "Kepegawaian" },
  { name: "Format Laporan Kegiatan Lapangan", type: "XLSX", owner: "Fungsi Statistik" }
];

function loadSavedShortcuts() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const savedApps = JSON.parse(window.localStorage.getItem("pokja-shortcuts") || "[]");
    return savedApps.map((app) => ({
      ...app,
      icon: iconOptions[app.logoIcon] ?? LayoutGrid,
      logoColor: app.logoColor ?? "blue",
      logoImage: app.logoImage ?? "",
      logoFileName: app.logoFileName ?? "",
      custom: true
    }));
  } catch {
    return [];
  }
}

function AppIcon({ app, size = 23 }) {
  const Icon = app.icon;
  const colorClass = app.logoColor ? ` ${app.logoColor}` : "";

  return (
    <span className={`appIcon${colorClass}`}>
      {app.logoImage ? (
        <img src={app.logoImage} alt="" />
      ) : Icon === "mark" ? (
        <BpsMark compact />
      ) : (
        <Icon size={size} />
      )}
    </span>
  );
}

function BpsMark({ compact = false }) {
  return (
    <span className={compact ? "bpsMark compact" : "bpsMark"} aria-hidden="true">
      <span className="markTile blue tall" />
      <span className="markTile orange" />
      <span className="markTile green" />
      <span className="markTile blue small" />
    </span>
  );
}

function PortalLogo({ small = false }) {
  return (
    <a className={small ? "portalLogo small" : "portalLogo"} href="/" aria-label="POKJA">
      <img className="portalLogoImage" src="/logobps.png" alt="" />
      <span>
        <strong>POKJA</strong>
        <small>Portal Kerja Badan Pusat Statistik Kabupaten Labuhanbatu Utara</small>
      </span>
    </a>
  );
}

function AppCard({ app }) {
  return (
    <a className="appCard" href={app.href} target="_blank" rel="noopener noreferrer">
      <AppIcon app={app} size={24} />
      <span className="appCopy">
        <strong>{app.name}</strong>
        <small>{app.description}</small>
      </span>
    </a>
  );
}

function StatCard({ item }) {
  const Icon = item.icon;

  return (
    <article className={`statCard ${item.tone}`}>
      <span>
        <Icon size={21} />
      </span>
      <strong>{item.value}</strong>
      <small>{item.label}</small>
    </article>
  );
}

function InternalAppCard({ app, onEdit }) {
  return (
    <article className={app.custom && onEdit ? "internalAppCard editable" : "internalAppCard"}>
      <a className="internalAppLink" href={app.href} target="_blank" rel="noopener noreferrer">
        <AppIcon app={app} />
        <span>
          <strong>{app.name}</strong>
          <small>{app.description}</small>
        </span>
        <ArrowUpRight size={17} />
      </a>
      {app.custom && onEdit ? (
        <button className="editShortcutButton" type="button" onClick={() => onEdit(app)}>
          <Pencil size={16} />
          Edit
        </button>
      ) : null}
    </article>
  );
}

function DashboardHome({ portalApps }) {
  return (
    <div className="dashboardStack">
      <section className="welcomePanel">
        <div>
          <span>Portal Kerja Internal</span>
          <h2>Selamat datang, Admin Labura</h2>

        </div>
        <button className="workPrimaryButton" type="button">
          <ClipboardList size={18} />
          Input Kinerja
        </button>
      </section>

      <div className="statGrid">
        {summaryCards.map((item) => (
          <StatCard item={item} key={item.label} />
        ))}
      </div>

      <div className="dashboardColumns">
        <section className="workPanel">
          <div className="panelHeader">
            <h3>Agenda Terdekat</h3>
            <CalendarDays size={19} />
          </div>
          <div className="agendaList">
            {agendaItems.map((item) => (
              <article key={`${item.time}-${item.title}`}>
                <time>{item.time}</time>
                <div>
                  <strong>{item.title}</strong>
                  <small>{item.meta}</small>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="workPanel">
          <div className="panelHeader">
            <h3>Pengumuman Terbaru</h3>
            <Megaphone size={19} />
          </div>
          <div className="announcementList">
            {announcements.slice(0, 3).map((item) => (
              <article key={item.title}>
                <span>{item.tag}</span>
                <strong>{item.title}</strong>
                <small>{item.date}</small>
              </article>
            ))}
          </div>
        </section>
      </div>

      <section className="workPanel">
        <div className="panelHeader">
          <h3>Aplikasi Cepat</h3>
          <LayoutGrid size={19} />
        </div>
        <div className="internalAppsGrid">
          {portalApps.map((app) => (
            <InternalAppCard app={app} key={app.id ?? app.name} />
          ))}
        </div>
      </section>
    </div>
  );
}

// Ambil favicon URL dari domain
function getFaviconUrl(url) {
  try {
    const origin = new URL(url).origin;
    return `${origin}/favicon.ico`;
  } catch {
    return "";
  }
}

function ApplicationsPage({ portalApps, customAppsCount, onAddApp, onUpdateApp }) {
  const emptyShortcutForm = {
    name: "",
    description: "",
    href: "",
    logoIcon: "grid",
    logoColor: "blue",
    logoImage: "",
    logoFileName: "",
    logoImageUrl: ""  // untuk paste URL logo langsung
  };
  const [isAdding, setIsAdding] = React.useState(false);
  const [editingId, setEditingId] = React.useState("");
  const [formData, setFormData] = React.useState({ ...emptyShortcutForm });
  const [formMessage, setFormMessage] = React.useState("");
  const [fetchingUrl, setFetchingUrl] = React.useState(false);
  const fetchTimerRef = React.useRef(null);
  const isEditing = Boolean(editingId);
  const PreviewIcon = iconOptions[formData.logoIcon] ?? LayoutGrid;

  // Coba load gambar — kembalikan URL yang berhasil, atau "" jika gagal
  const tryLoadImage = (src) =>
    new Promise((resolve) => {
      if (!src) return resolve("");
      const img = new Image();
      img.onload = () => resolve(src);
      img.onerror = () => resolve("");
      img.src = src;
      setTimeout(() => resolve(""), 4000); // timeout 4 detik
    });

  // Auto-fetch metadata ketika URL diisi
  const fetchMetadata = React.useCallback(async (url) => {
    if (!url || !url.startsWith("http")) return;
    setFetchingUrl(true);

    let domain = "";
    try { domain = new URL(url).hostname; } catch { /* ignore */ }

    // Daftar layanan favicon — dicoba satu per satu sampai ada yang berhasil load
    const faviconCandidates = domain ? [
      `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
      `https://icons.duckduckgo.com/ip3/${domain}.ico`,
      `https://favicon.im/${domain}?larger=true`,
      `https://${domain}/favicon.ico`
    ] : [];

    // Tampilkan favicon terbaik yang bisa diload (non-blocking)
    (async () => {
      for (const src of faviconCandidates) {
        const ok = await tryLoadImage(src);
        if (ok) {
          setFormData((cur) => ({
            ...cur,
            logoImage: cur.logoImage || ok,
            logoFileName: cur.logoFileName || "favicon"
          }));
          break;
        }
      }
    })();

    try {
      // Coba fetch metadata via proxy
      const proxy = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
      const res = await fetch(proxy, { signal: AbortSignal.timeout(6000) });
      const data = await res.json();
      const html = data.contents || "";

      if (!html || html.length < 100) throw new Error("empty");

      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      const title =
        doc.querySelector('meta[property="og:title"]')?.content ||
        doc.querySelector("title")?.textContent || "";
      const desc =
        doc.querySelector('meta[property="og:description"]')?.content ||
        doc.querySelector('meta[name="description"]')?.content || "";
      const ogImage = doc.querySelector('meta[property="og:image"]')?.content || "";
      const base = new URL(url).origin;
      const betterLogo = ogImage
        ? (ogImage.startsWith("http") ? ogImage : `${base}${ogImage}`)
        : "";

      setFormData((cur) => ({
        ...cur,
        name: cur.name || title.trim().slice(0, 80),
        description: cur.description || desc.trim().slice(0, 120),
        logoImage: betterLogo || cur.logoImage,
        logoFileName: betterLogo ? "auto-fetch" : cur.logoFileName
      }));
      setFormMessage(title
        ? `✅ Info berhasil diambil dari "${title.trim().slice(0, 40)}"`
        : `✅ Logo diambil — isi nama & deskripsi manual jika perlu.`
      );
    } catch {
      setFormMessage(
        domain
          ? `⚠ Metadata "${domain}" tidak bisa diambil otomatis — logo sudah ditampilkan, isi nama & deskripsi manual.`
          : "⚠ Gagal mengambil info. Isi manual."
      );
    } finally {
      setFetchingUrl(false);
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));

    // Trigger auto-fetch saat kolom href diubah (debounce 800ms)
    if (name === "href") {
      clearTimeout(fetchTimerRef.current);
      if (value.startsWith("http")) {
        fetchTimerRef.current = setTimeout(() => fetchMetadata(value), 800);
      }
    }
  };

  const handleStartAdd = () => {
    setEditingId("");
    setFormData(emptyShortcutForm);
    setFormMessage("");
    setIsAdding(true);
  };

  const handleStartEdit = (app) => {
    setEditingId(app.id);
    setFormData({
      name: app.name,
      description: app.description,
      href: app.href,
      logoIcon: app.logoIcon ?? "grid",
      logoColor: app.logoColor ?? "blue",
      logoImage: app.logoImage ?? "",
      logoFileName: app.logoFileName ?? ""
    });
    setFormMessage("");
    setIsAdding(true);
  };

  const handleCancelForm = () => {
    setEditingId("");
    setFormData(emptyShortcutForm);
    setIsAdding(false);
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setFormMessage("File logo harus berupa gambar.");
      return;
    }

    if (file.size > 1_500_000) {
      setFormMessage("Ukuran logo maksimal 1,5 MB agar tetap aman disimpan di browser.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((current) => ({
        ...current,
        logoImage: String(reader.result),
        logoFileName: file.name
      }));
      setFormMessage(`Logo "${file.name}" siap digunakan.`);
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const handleRemoveLogoImage = () => {
    setFormData((current) => ({ ...current, logoImage: "", logoFileName: "" }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = formData.name.trim();
    const description = formData.description.trim();
    const href = formData.href.trim();
    const LogoIcon = iconOptions[formData.logoIcon] ?? LayoutGrid;

    if (!name) {
      setFormMessage("Nama layanan wajib diisi.");
      return;
    }

    const shortcutPayload = {
      id: editingId || `shortcut-${Date.now()}`,
      name,
      description,
      href: href || `#${name.toLowerCase().replaceAll(" ", "-")}`,
      icon: LogoIcon,
      logoIcon: formData.logoIcon,
      logoColor: formData.logoColor,
      logoImage: formData.logoImage,
      logoFileName: formData.logoFileName,
      custom: true
    };

    if (isEditing) {
      onUpdateApp(shortcutPayload);
      setFormMessage(`Shortcut "${name}" berhasil diperbarui.`);
    } else {
      onAddApp(shortcutPayload);
      setFormMessage(`Shortcut "${name}" berhasil disimpan.`);
    }

    setEditingId("");
    setFormData(emptyShortcutForm);
    setIsAdding(false);
  };

  return (
    <section className="workPanel pagePanel">
      <div className="panelHeader">
        <div>
          <h3>Aplikasi Internal</h3>
          <p>Shortcut layanan kerja dan aplikasi operasional satker.</p>
        </div>
        <button className="addShortcutButton" type="button" onClick={handleStartAdd}>
          <Plus size={17} />
          Tambah Shortcut
        </button>
      </div>

      {isAdding ? (
        <form className="shortcutForm" onSubmit={handleSubmit}>

          {/* ── STEP 1: URL Fetch ── */}
          <div className="urlFetchSection">
            <div className="urlFetchHeader">
              <Globe2 size={18} />
              <span>Langkah 1 — Paste URL Layanan</span>
              <small>Nama, deskripsi, dan logo akan otomatis terisi</small>
            </div>
            <div className="urlFetchRow">
              <input
                name="href"
                type="text"
                className="urlFetchInput"
                placeholder="https://pst.bps.go.id"
                value={formData.href}
                onChange={handleChange}
                autoFocus
              />
              <button
                type="button"
                className="urlFetchBtn"
                disabled={fetchingUrl || !formData.href.startsWith("http")}
                onClick={() => fetchMetadata(formData.href)}
              >
                {fetchingUrl ? (
                  <><span className="spinnerDot" />Mengambil...</>
                ) : (
                  <>🔍 Ambil Info</>
                )}
              </button>
            </div>

            {/* Preview card setelah fetch */}
            {(formData.name || formData.logoImage) && (
              <div className="fetchPreviewCard">
                {formData.logoImage ? (
                  <img
                    src={formData.logoImage}
                    alt=""
                    className="fetchPreviewLogo"
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                ) : (
                  <span className={`appIcon ${formData.logoColor}`}>
                    <PreviewIcon size={20} />
                  </span>
                )}
                <div className="fetchPreviewInfo">
                  <strong>{formData.name}</strong>
                  {formData.description && <small>{formData.description}</small>}
                  <span className="fetchPreviewUrl">{formData.href}</span>
                </div>
                {formMessage && (
                  <span className={formMessage.startsWith("✅") ? "fetchStatus ok" : "fetchStatus warn"}>
                    {formMessage}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* ── STEP 2: Edit Manual ── */}
          <div className="manualEditSection">
            <div className="urlFetchHeader">
              <Pencil size={16} />
              <span>Langkah 2 — Edit jika perlu</span>
            </div>
            <div className="manualEditFields">
              <label>
                <span>Nama layanan <em>*</em></span>
                <input
                  name="name"
                  type="text"
                  placeholder="Contoh: PST Online"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                <span>Deskripsi</span>
                <input
                  name="description"
                  type="text"
                  placeholder="Deskripsi singkat layanan"
                  value={formData.description}
                  onChange={handleChange}
                />
              </label>
              {/* Logo URL langsung — untuk intranet/VPN */}
              <label style={{ gridColumn: "1 / -1" }}>
                <span>URL Logo <small style={{ fontWeight: 500, color: "#64748b" }}>(paste URL gambar, misal: https://community.bps.go.id/img/logo.png)</small></span>
                <div className="logoUrlInputRow">
                  <input
                    name="logoImageUrl"
                    type="text"
                    placeholder="https://... atau kosongkan"
                    value={formData.logoImageUrl || ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFormData((cur) => ({
                        ...cur,
                        logoImageUrl: val,
                        logoImage: val || cur.logoImage,
                        logoFileName: val ? "url-logo" : cur.logoFileName
                      }));
                    }}
                  />
                  {/* Preview mini */}
                  {(formData.logoImageUrl || formData.logoImage) && (
                    <img
                      src={formData.logoImageUrl || formData.logoImage}
                      alt="preview"
                      className="logoUrlPreview"
                      onError={(e) => { e.target.style.opacity = "0.3"; }}
                    />
                  )}
                  {/* Upload dari komputer */}
                  <label className="uploadLogoBox" title="Upload dari komputer">
                    <ImageUp size={16} />
                    Upload
                    <input type="file" accept="image/*" onChange={handleLogoUpload} />
                  </label>
                  {formData.logoImage && (
                    <button
                      type="button"
                      className="removeLogoButton"
                      onClick={() => setFormData((cur) => ({ ...cur, logoImage: "", logoImageUrl: "", logoFileName: "" }))}
                    >
                      Hapus
                    </button>
                  )}
                </div>
              </label>
            </div>
          </div>



          <div className="shortcutActions">
            <button className="cancelShortcutButton" type="button" onClick={handleCancelForm}>
              Batal
            </button>
            <button className="saveShortcutButton" type="submit">
              {isEditing ? "Simpan Perubahan" : "Simpan Shortcut"}
            </button>
          </div>
        </form>
      ) : null}

      {formMessage ? <p className="shortcutMessage">{formMessage}</p> : null}

      <div className="shortcutCounter">
        <span>{customAppsCount}</span>
        shortcut tambahan tersimpan. Shortcut baru muncul di urutan paling atas.
      </div>

      <div className="internalAppsGrid expanded">
        {portalApps.map((app) => (
          <InternalAppCard app={app} key={app.id ?? app.name} onEdit={handleStartEdit} />
        ))}
      </div>
    </section>
  );
}

function PerformancePage() {
  const tasks = [
    { title: "Input kegiatan harian", status: "Selesai", progress: 100 },
    { title: "Rekap SKP mingguan", status: "Berjalan", progress: 72 },
    { title: "Laporan kegiatan lapangan", status: "Review", progress: 58 }
  ];

  return (
    <section className="workPanel pagePanel">
      <div className="panelHeader">
        <div>
          <h3>Kinerja Pegawai</h3>
          <p>Monitoring pekerjaan harian, SKP, dan laporan bulanan.</p>
        </div>
        <ClipboardList size={20} />
      </div>
      <div className="taskList">
        {tasks.map((task) => (
          <article key={task.title}>
            <div>
              <strong>{task.title}</strong>
              <small>{task.status}</small>
            </div>
            <div className="progressTrack">
              <span style={{ width: `${task.progress}%` }} />
            </div>
            <b>{task.progress}%</b>
          </article>
        ))}
      </div>
    </section>
  );
}

function AnnouncementsPage() {
  return (
    <section className="workPanel pagePanel">
      <div className="panelHeader">
        <div>
          <h3>Pengumuman</h3>
          <p>Informasi internal, surat edaran, dan jadwal penting kantor.</p>
        </div>
        <Megaphone size={20} />
      </div>
      <div className="announcementList pageList">
        {announcements.map((item) => (
          <article key={item.title}>
            <span>{item.tag}</span>
            <strong>{item.title}</strong>
            <small>{item.date}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

function DocumentsPage() {
  return (
    <section className="workPanel pagePanel">
      <div className="panelHeader">
        <div>
          <h3>Dokumen dan Arsip</h3>
          <p>Template, SOP, pedoman, dan dokumen kerja bersama.</p>
        </div>
        <FolderOpen size={20} />
      </div>
      <div className="documentGrid">
        {documents.map((document) => (
          <article key={document.name}>
            <FileText size={22} />
            <strong>{document.name}</strong>
            <small>{document.owner}</small>
            <span>{document.type}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProfilePage() {
  return (
    <section className="profileGrid">
      <div className="profileCard">
        <div className="avatarLarge">AL</div>
        <h3>Admin Labura</h3>
        <p>Operator Portal Kerja</p>
      </div>
      <div className="workPanel pagePanel">
        <div className="panelHeader">
          <div>
            <h3>Profil Pegawai</h3>
            <p>Data akun yang digunakan pada portal internal.</p>
          </div>
          <UserRound size={20} />
        </div>
        <dl className="profileDetails">
          <div>
            <dt>Unit Kerja</dt>

          </div>
          <div>
            <dt>Role</dt>
            <dd>Administrator</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>bps1223@bps.go.id</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>Aktif</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

function AdminPage() {
  const adminTools = [
    { title: "Manajemen Pengguna", text: "Tambah user, ubah role, dan reset password.", icon: UserRound },
    { title: "Hak Akses", text: "Atur izin menu dan aplikasi untuk tiap pegawai.", icon: ShieldCheck },
    { title: "Log Aktivitas", text: "Pantau aktivitas login dan perubahan data portal.", icon: Clock }
  ];

  return (
    <section className="workPanel pagePanel">
      <div className="panelHeader">
        <div>
          <h3>Admin Portal</h3>
          <p>Pengaturan akun, role, hak akses, dan aktivitas sistem.</p>
        </div>
        <Settings size={20} />
      </div>
      <div className="adminGrid">
        {adminTools.map((tool) => {
          const Icon = tool.icon;
          return (
            <article key={tool.title}>
              <Icon size={23} />
              <strong>{tool.title}</strong>
              <small>{tool.text}</small>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function WorkContent({ activeMenu, portalApps, customAppsCount, onAddApp, onUpdateApp }) {
  if (activeMenu === "aplikasi") {
    return (
      <ApplicationsPage
        portalApps={portalApps}
        customAppsCount={customAppsCount}
        onAddApp={onAddApp}
        onUpdateApp={onUpdateApp}
      />
    );
  }
  if (activeMenu === "kinerja") return <PerformancePage />;
  if (activeMenu === "pengumuman") return <AnnouncementsPage />;
  if (activeMenu === "dokumen") return <DocumentsPage />;
  if (activeMenu === "profil") return <ProfilePage />;
  if (activeMenu === "admin") return <AdminPage />;
  return <DashboardHome portalApps={portalApps} />;
}

function WorkPortal({ onLogout, portalApps, customAppsCount, onAddApp, onUpdateApp, activeUser }) {
  const [activeMenu, setActiveMenu] = React.useState("dashboard");
  const active = workMenus.find((menu) => menu.key === activeMenu) ?? workMenus[0];

  return (
    <main className="workPortal">
      <aside className="workSidebar">
        <PortalLogo />
        <nav className="workNav" aria-label="Menu portal kerja">
          {workMenus.filter((menu) => menu.enabled).map((menu) => {
            const Icon = menu.icon;
            return (
              <button
                className={activeMenu === menu.key ? "workNavButton active" : "workNavButton"}
                type="button"
                key={menu.key}
                onClick={() => setActiveMenu(menu.key)}
              >
                <Icon size={18} />
                {menu.label}
              </button>
            );
          })}
        </nav>
        <button className="logoutButton" type="button" onClick={onLogout}>
          <LogOut size={18} />
          Keluar
        </button>
      </aside>

      <section className="workMain">
        <header className="workTopbar">
          <div>

            <h1>{active.label}</h1>
          </div>
          <div className="userBadge">
            <span>{activeUser ? activeUser.slice(0, 2).toUpperCase() : "AL"}</span>
            <div>
              <strong>{activeUser || "Admin Labura"}</strong>
              <small>Operator Portal</small>
            </div>
          </div>
        </header>
        <div className="workContent">
          <WorkContent
            activeMenu={activeMenu}
            portalApps={portalApps}
            customAppsCount={customAppsCount}
            onAddApp={onAddApp}
            onUpdateApp={onUpdateApp}
          />
        </div>
      </section>
    </main>
  );
}

function LoginModal({ onClose, onLogin }) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [showPass, setShowPass] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  // Generate 50 rotating bars (sesuai style1.css)
  const NUM_BARS = 50;
  const bars = Array.from({ length: NUM_BARS }, (_, i) => i);

  React.useEffect(() => {
    const handleKeyDown = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      const valid = VALID_CREDENTIALS.find(
        (c) => c.username === username.trim() && c.password === password
      );
      if (valid) {
        onLogin(username.trim());
      } else {
        setError("Username atau password salah. Coba lagi.");
      }
      setLoading(false);
    }, 400);
  };

  return (
    <div className="modalLayer" role="presentation" onMouseDown={onClose}>
      <div className="loginContainer" onMouseDown={(e) => e.stopPropagation()}>

        {/* Rotating bars animation */}
        <div className="loginCircle" aria-hidden="true">
          {bars.map((i) => (
            <span
              key={i}
              className="loginBar"
              style={{ transform: `rotate(${(360 / NUM_BARS) * i}deg) translateY(-130px)` }}
            />
          ))}
        </div>

        {/* Login card */}
        <section
          className="loginBox"
          role="dialog"
          aria-modal="true"
          aria-labelledby="login-title"
        >
          <button className="closeButton" type="button" aria-label="Tutup" onClick={onClose}>
            <X size={16} />
          </button>

          {/* Logo */}
          <div className="loginLogo">
            <img src="/logobps.png" alt="BPS" className="loginLogoImg" />
          </div>

          <h2 id="login-title" className="loginTitle">MASUK PORTAL</h2>
          <p className="loginSubtitle">BPS Kabupaten Labuhanbatu Utara</p>

          {error && (
            <div className="loginError">⚠ {error}</div>
          )}

          <form className="loginForm2" onSubmit={handleSubmit}>
            <div className="loginInputGroup">
              <input
                type="text"
                placeholder="Username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <span className="loginInputIcon"><User size={15} /></span>
            </div>

            <div className="loginInputGroup">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="loginInputIcon loginTogglePass"
                onClick={() => setShowPass((v) => !v)}
                aria-label={showPass ? "Sembunyikan" : "Tampilkan"}
              >
                {showPass ? <LockKeyhole size={15} /> : <LockKeyhole size={15} />}
              </button>
            </div>

            <button className="loginSubmitBtn" type="submit" disabled={loading}>
              {loading ? "Memverifikasi..." : "LOGIN"}
            </button>
          </form>

          <p className="loginFooter">Hanya untuk pegawai BPS Kab. Labuhanbatu Utara</p>
        </section>
      </div>
    </div>
  );
}

function App() {
  const [query, setQuery] = React.useState("");
  const [isLoginOpen, setIsLoginOpen] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [activeUser, setActiveUser] = React.useState("");
  const [customApps, setCustomApps] = React.useState(loadSavedShortcuts);
  const portalApps = React.useMemo(() => [...customApps, ...apps], [customApps]);
  const filteredApps = portalApps.filter((app) =>
    `${app.name} ${app.description}`.toLowerCase().includes(query.toLowerCase())
  );

  React.useEffect(() => {
    const storableApps = customApps.map(
      ({ id, name, description, href, logoIcon, logoColor, logoImage, logoFileName }) => ({
        id,
        name,
        description,
        href,
        logoIcon,
        logoColor,
        logoImage,
        logoFileName
      })
    );
    window.localStorage.setItem("pokja-shortcuts", JSON.stringify(storableApps));
  }, [customApps]);

  const handleAddApp = (newApp) => {
    setCustomApps((currentApps) => [newApp, ...currentApps]);
  };

  const handleUpdateApp = (updatedApp) => {
    setCustomApps((currentApps) =>
      currentApps.map((app) => (app.id === updatedApp.id ? updatedApp : app))
    );
  };

  const handleLogin = (username) => {
    setActiveUser(username);
    setIsAuthenticated(true);
    setIsLoginOpen(false);
  };

  if (isAuthenticated) {
    return (
      <WorkPortal
        onLogout={() => { setIsAuthenticated(false); setActiveUser(""); }}
        portalApps={portalApps}
        customAppsCount={customApps.length}
        onAddApp={handleAddApp}
        onUpdateApp={handleUpdateApp}
        activeUser={activeUser}
      />
    );
  }

  return (
    <main className="portalShell">
      <div className="backgroundImage" aria-hidden="true" />
      <div className="screenOverlay" aria-hidden="true" />

      <header className="portalHeader">
        <PortalLogo />
        <button className="loginButton" type="button" onClick={() => setIsLoginOpen(true)}>
          <LogIn size={16} />
          Masuk Portal
        </button>
      </header>

      <section className="heroSection" aria-labelledby="portal-title">
        <h1 id="portal-title">POKJA</h1>
        <p>Portal Kerja Badan Pusat Statistik Kabupaten Labuhanbatu Utara</p>

        <label className="searchBox" aria-label="Cari aplikasi">
          <Search size={17} />
          <input
            type="search"
            placeholder="Cari aplikasi..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>

        <div className="appGrid" aria-label="Daftar aplikasi portal">
          {(filteredApps.length ? filteredApps : portalApps).map((app) => (
            <AppCard app={app} key={app.id ?? app.name} />
          ))}
        </div>
      </section>

      <footer className="portalFooter">
        <p className="copyright" style={{ textAlign: "center" }}>
          &copy; 2026 TIM IPDS. All rights reserved.
        </p>
      </footer>

      {isLoginOpen ? (
        <LoginModal onClose={() => setIsLoginOpen(false)} onLogin={handleLogin} />
      ) : null}
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
