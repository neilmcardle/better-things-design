import Image from "next/image";

export function ClientCard({ client, onClose, onMouseEnter, onMouseLeave }) {
  return (
    <div
      className="client-card"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      tabIndex={-1}
    >
      <div className="card-row">
        <div className="avatar-wrap">
          <Image
            src={client.logo}
            alt={client.name}
            width={52}
            height={52}
            style={{
              borderRadius: 14,
              background: "#232323",
              objectFit: "contain",
              border: "1px solid #666",
            }}
          />
        </div>
        {/* ...rest unchanged... */}
      </div>
      {/* ...rest unchanged... */}
    </div>
  );
}