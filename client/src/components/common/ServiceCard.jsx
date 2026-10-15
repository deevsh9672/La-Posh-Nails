import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, ArrowRight, Sparkles } from 'lucide-react';

export const ServiceCard = ({ service }) => {
  const { _id, name, category, description, price, durationMinutes, imageUrl } = service;

  return (
    <div className="group bg-white rounded-2xl border border-laposh-border overflow-hidden shadow-subtle hover:shadow-luxury transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
      {/* Service Image with Category Badge */}
      <div className="relative aspect-[4/3] overflow-hidden bg-laposh-warm">
        <img
          src={imageUrl}
          alt={`${name} at La Posh Nails Studio Rajkot`}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-white/90 backdrop-blur-sm text-laposh-gold border border-laposh-gold/20 shadow-xs">
            {category}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="font-serif text-lg font-bold text-laposh-text group-hover:text-laposh-gold transition-colors mb-2">
            {name}
          </h3>
          <p className="text-xs text-laposh-muted leading-relaxed line-clamp-3 mb-4">
            {description}
          </p>
        </div>

        <div>
          {/* Metadata Row: Duration & Verified Price */}
          <div className="flex items-center justify-between pt-3 border-t border-laposh-border/60 text-xs text-laposh-muted mb-4">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-laposh-gold" />
              <span>{durationMinutes || 60} mins</span>
            </div>

            <div className="font-medium">
              {price !== null && price !== undefined ? (
                <span className="text-laposh-text font-bold">₹{price}</span>
              ) : (
                <span className="text-laposh-muted italic text-[11px]">Enquire for pricing</span>
              )}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="grid grid-cols-2 gap-2">
            <Link
              to={`/book-appointment?service=${_id}`}
              className="flex items-center justify-center gap-1.5 w-full py-2.5 px-3 rounded-xl bg-laposh-gold hover:bg-laposh-gold-dark text-white text-xs font-semibold tracking-wide uppercase shadow-xs transition-colors"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Slot</span>
            </Link>

            <a
              href={`https://wa.me/919512348787?text=${encodeURIComponent(
                `Hello La Posh, I would like to enquire about the "${name}" service.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1 w-full py-2.5 px-3 rounded-xl border border-laposh-border hover:border-laposh-gold bg-laposh-warm/50 hover:bg-laposh-warm text-laposh-text text-xs font-semibold tracking-wide transition-colors"
            >
              <span>WhatsApp</span>
              <ArrowRight className="w-3.5 h-3.5 text-laposh-gold" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
