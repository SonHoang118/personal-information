import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import people from "@/data/people.json";
import FallingPetals from "@/app/components/FallingPetals";
import CardSparkles from "@/app/components/CardSparkles";

type Person = (typeof people)[number];

const themes: Record<string, {
    bg: string;
    ring: string;
    placeholder: string;
    placeholderIcon: string;
    divider: string;
    useBgImage?: boolean;
}> = {
    default: {
        bg: "from-indigo-50 via-white to-cyan-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950",
        ring: "from-indigo-500 via-purple-500 to-pink-500",
        placeholder: "from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50",
        placeholderIcon: "text-indigo-400 dark:text-indigo-300",
        divider: "via-zinc-300 dark:via-zinc-700",
    },
    emerald: {
        bg: "from-emerald-50 via-white to-teal-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950",
        ring: "from-emerald-500 via-teal-500 to-cyan-500",
        placeholder: "from-emerald-100 to-teal-100 dark:from-emerald-900/50 dark:to-teal-900/50",
        placeholderIcon: "text-emerald-400 dark:text-emerald-300",
        divider: "via-emerald-300 dark:via-emerald-700",
    },
    rose: {
        bg: "from-rose-50 via-white to-pink-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950",
        ring: "from-rose-500 via-pink-500 to-fuchsia-500",
        placeholder: "from-rose-100 to-pink-100 dark:from-rose-900/50 dark:to-pink-900/50",
        placeholderIcon: "text-rose-400 dark:text-rose-300",
        divider: "via-rose-300 dark:via-rose-700",
    },
    amber: {
        bg: "from-amber-50 via-white to-orange-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950",
        ring: "from-amber-500 via-orange-500 to-red-500",
        placeholder: "from-amber-100 to-orange-100 dark:from-amber-900/50 dark:to-orange-900/50",
        placeholderIcon: "text-amber-400 dark:text-amber-300",
        divider: "via-amber-300 dark:via-amber-700",
    },
    ocean: {
        bg: "from-sky-50 via-white to-blue-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950",
        ring: "from-sky-500 via-blue-500 to-indigo-500",
        placeholder: "from-sky-100 to-blue-100 dark:from-sky-900/50 dark:to-blue-900/50",
        placeholderIcon: "text-sky-400 dark:text-sky-300",
        divider: "via-sky-300 dark:via-sky-700",
    },
    violet: {
        bg: "from-violet-50 via-white to-purple-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950",
        ring: "from-violet-500 via-purple-500 to-fuchsia-500",
        placeholder: "from-violet-100 to-purple-100 dark:from-violet-900/50 dark:to-purple-900/50",
        placeholderIcon: "text-violet-400 dark:text-violet-300",
        divider: "via-violet-300 dark:via-violet-700",
    },
    pink: {
        bg: "",
        ring: "from-pink-400 via-rose-400 to-fuchsia-400",
        placeholder: "from-pink-100 to-rose-100 dark:from-pink-900/50 dark:to-rose-900/50",
        placeholderIcon: "text-pink-400 dark:text-pink-300",
        divider: "via-pink-300 dark:via-pink-600",
        useBgImage: true,
    },
};

interface PageProps {
    params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
    return people.map((person) => ({ slug: person.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const person = people.find((p) => p.slug === slug);
    if (!person) return {};
    return {
        title: `${person.name} - Thông Tin Cá Nhân`,
        description: `Thông tin liên hệ của ${person.name}`,
    };
}

function ProfileCard({ person }: { person: Person }) {
    const t = themes[person.theme ?? ""] ?? themes.default;
    const isPink = t.useBgImage;

    return (
        <div
            className={`relative flex flex-1 items-center justify-center px-4 pb-12 pt-20 ${isPink ? "bg-cover bg-center bg-no-repeat" : `bg-linear-to-br ${t.bg}`}`}
            style={isPink ? { backgroundImage: "url('/bg1.png')" } : undefined}
        >
            {isPink && <div className="absolute inset-0 z-0 bg-pink-50/40 dark:bg-zinc-950/60" />}
            {isPink && <FallingPetals />}
            {isPink && <CardSparkles />}
            <div className={`animate-fade-in relative z-10 w-full max-w-md rounded-3xl border px-8 py-10 shadow-2xl ${isPink ? "border-pink-200/60 bg-pink-100/50 dark:border-pink-800/40 dark:bg-zinc-900/80" : "border-zinc-200/60 bg-white/80 dark:border-zinc-700/50 dark:bg-zinc-900/80"}`}>
                {/* Avatar */}
                <div className="flex justify-center">
                    <div className={`rounded-full bg-linear-to-tr ${t.ring} p-1`}>
                        {person.avatar ? (
                            <Image
                                src={person.avatar}
                                alt={person.name}
                                width={128}
                                height={128}
                                className="h-32 w-32 rounded-full border-4 border-white object-cover dark:border-zinc-900"
                                priority
                            />
                        ) : (
                            <div className={`flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-linear-to-br ${t.placeholder} dark:border-zinc-900`}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-16 w-16 ${t.placeholderIcon}`}
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v1.2c0 .7.5 1.2 1.2 1.2h16.8c.7 0 1.2-.5 1.2-1.2v-1.2c0-3.2-6.4-4.8-9.6-4.8z" />
                                </svg>
                            </div>
                        )}
                    </div>
                </div>

                {/* Name & Title */}
                <div className="mt-6 text-center">
                    <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                        {person.name}
                    </h1>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                        {person.title}
                    </p>
                </div>

                {/* Divider */}
                <div className={`my-6 h-px bg-linear-to-r from-transparent ${t.divider} to-transparent`} />

                {/* Contact Info */}
                <div className="flex flex-col gap-3">
                    {/* Phone */}
                    <a
                        href={`tel:${person.phoneRaw}`}
                        className="group flex items-center gap-4 rounded-2xl border border-zinc-100 bg-zinc-50/80 px-5 py-4 transition-all duration-200 hover:scale-[1.02] hover:border-green-200 hover:bg-green-50 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-800/50 dark:hover:border-green-500/30 dark:hover:bg-green-950/30"
                    >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                            <Image src="/phone.png" alt="Phone" width={28} height={28} />
                        </span>
                        <div>
                            <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500">Điện thoại</p>
                            <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{person.phone}</p>
                        </div>
                    </a>

                    {/* Zalo */}
                    <a
                        href={`https://zalo.me/${person.zalo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-4 rounded-2xl border border-zinc-100 bg-zinc-50/80 px-5 py-4 transition-all duration-200 hover:scale-[1.02] hover:border-blue-200 hover:bg-blue-50 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-800/50 dark:hover:border-blue-500/30 dark:hover:bg-blue-950/30"
                    >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                            <Image src="/zalo.png" alt="Zalo" width={28} height={28} />
                        </span>
                        <div>
                            <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500">Zalo</p>
                            <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{person.phone}</p>
                        </div>
                    </a>

                    {/* Facebook */}
                    <a
                        href={`https://facebook.com/${person.facebook}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-4 rounded-2xl border border-zinc-100 bg-zinc-50/80 px-5 py-4 transition-all duration-200 hover:scale-[1.02] hover:border-sky-200 hover:bg-sky-50 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-800/50 dark:hover:border-sky-500/30 dark:hover:bg-sky-950/30"
                    >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                            <Image src="/facebook.png" alt="Facebook" width={68} height={68} />
                        </span>
                        <div>
                            <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500">Facebook</p>
                            <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{person.facebookName}</p>
                        </div>
                    </a>

                    {/* Email */}
                    {person.email && (
                        <a
                            href={`mailto:${person.email}`}
                            className="group flex items-center gap-4 rounded-2xl border border-zinc-100 bg-zinc-50/80 px-5 py-4 transition-all duration-200 hover:scale-[1.02] hover:border-orange-200 hover:bg-orange-50 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-800/50 dark:hover:border-orange-500/30 dark:hover:bg-orange-950/30"
                        >
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                                <Image src="/email.png" alt="Email" width={28} height={28} />
                            </span>
                            <div>
                                <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500">Email</p>
                                <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{person.email}</p>
                            </div>
                        </a>
                    )}

                    {/* Instagram */}
                    {person.instagram && (
                        <a
                            href={`https://instagram.com/${person.instagram}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-4 rounded-2xl border border-zinc-100 bg-zinc-50/80 px-5 py-4 transition-all duration-200 hover:scale-[1.02] hover:border-pink-200 hover:bg-pink-50 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-800/50 dark:hover:border-pink-500/30 dark:hover:bg-pink-950/30"
                        >
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                                <Image src="/instagram.png" alt="Instagram" width={68} height={68} />
                            </span>
                            <div>
                                <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500">Instagram</p>
                                <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">@{person.instagram}</p>
                            </div>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

export default async function PersonPage({ params }: PageProps) {
    const { slug } = await params;
    const person = people.find((p) => p.slug === slug);
    if (!person) notFound();
    return <ProfileCard person={person} />;
}
