import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function DoctorCard({ doctor }) {
  if (!doctor) return null;

  return (
    <Card className="flex flex-col justify-between transition-shadow hover:shadow-md">
      <div>
        <div className="mb-3 flex items-start justify-between">
          <div>
            <span className="badge badge-accent mb-1">{doctor.specialty}</span>
            <h3 className="text-lg font-semibold tracking-tight text-fg">
              {doctor.name}
            </h3>
            <p className="text-xs font-medium text-mute">{doctor.title}</p>
          </div>
          <div className="flex items-center gap-1 rounded bg-bg px-2 py-1 text-xs font-semibold text-fg">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="#0f766e"
              stroke="#0f766e"
              strokeWidth="1"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span>{doctor.rating}</span>
            <span className="text-xs text-mute">({doctor.reviewCount})</span>
          </div>
        </div>

        <p className="mb-4 text-xs leading-relaxed text-mute line-clamp-2">
          {doctor.bio}
        </p>

        <div className="mb-4 space-y-1.5 border-t border-line pt-3 text-xs">
          <div className="flex justify-between">
            <span className="text-mute">Qualifications:</span>
            <span className="font-medium text-fg text-right">{doctor.qualifications}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-mute">Experience:</span>
            <span className="font-medium text-fg">{doctor.experienceYears} Years</span>
          </div>
          <div className="flex justify-between">
            <span className="text-mute">Consultation:</span>
            <span className="font-semibold text-accent">{doctor.consultationFee}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2 border-t border-line pt-3">
        <Link href={`/doctors/${doctor.id}`} className="flex-1">
          <Button variant="secondary" size="sm" className="w-full">
            Profile
          </Button>
        </Link>
        <Link
          href={`/appointments?doctor=${encodeURIComponent(doctor.id)}&department=${encodeURIComponent(
            doctor.departmentSlug
          )}`}
          className="flex-1"
        >
          <Button size="sm" className="w-full">
            Book
          </Button>
        </Link>
      </div>
    </Card>
  );
}
