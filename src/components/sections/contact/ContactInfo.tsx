import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import type { ContactDetails } from "@/types/contact";

type ContactInfoProps = {
  details: ContactDetails;
};

export function ContactInfo({ details }: ContactInfoProps) {
  return (
    <aside className="lg:col-span-1">
      <Card>
        <CardHeader>
          <CardTitle>Contact</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Email
            </p>
            <a
              href={`mailto:${details.email}`}
              className="mt-1 block text-sm font-medium text-[var(--brand)] hover:underline"
            >
              {details.email}
            </a>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Phone
            </p>
            <a
              href={`tel:${details.phone.replace(/[^\d+]/g, "")}`}
              className="mt-1 block text-sm text-zinc-800 dark:text-zinc-200"
            >
              {details.phone}
            </a>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Office
            </p>
            <address className="mt-1 not-italic text-sm text-zinc-600 dark:text-zinc-400">
              {details.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Hours
            </p>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {details.hoursLabel}
            </p>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
