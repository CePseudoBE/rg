/**
 * URL de producción por defecto. En Cloudflare Pages podés sobrescribirla con la
 * variable de entorno `SITE_URL` (ver `astro.config.ts`) — así, al cambiar de dominio,
 * no hace falta tocar el código: solo actualizar la variable y redeployar.
 */
export const SITE_URL = process.env.SITE_URL ?? 'https://rg-d5v.pages.dev';

export const business = {
	name: 'RG Refrigeración',
	city: 'Comodoro Rivadavia',
	province: 'Chubut',
	phone: '0297 492-4234',
	/** Formato E.164 para enlaces `tel:` y datos estructurados (Argentina +54, área 297 sin el 0). */
	phoneE164: '+542974924234',
	get phoneHref() {
		return `tel:${this.phoneE164}`;
	},
	streetAddress: 'Av. Julio Argentino Roca 875',
	postalCode: 'U9000',
	get address() {
		return `${this.streetAddress}, ${this.postalCode} ${this.city}, ${this.province}`;
	},
	countryCode: 'AR',
	/** Coordenadas aproximadas del local (centro de Comodoro Rivadavia). */
	geo: { latitude: -45.8644, longitude: -67.4966 },
	description:
		'Venta de insumos, herramientas y repuestos para refrigeración y aire acondicionado, con productos de calidad para instalación, mantenimiento y reparación.',
} as const;

export const mapsHref =
	'https://www.google.com/maps/search/?api=1&query=' +
	encodeURIComponent(`${business.name}, ${business.address}`);

/** Imágenes en /public/assets: logo.jpeg + product_1.jpeg … product_24.jpeg */
export const productImages = Array.from({ length: 24 }, (_, i) => `/assets/product_${i + 1}.jpeg`);

/** Orden de la semana: índice 0 = lunes … 6 = domingo (coincide con `(new Date().getDay() + 6) % 7`). */
export const openingHours = [
	{ day: 'Lunes', time: '9:00 – 19:00', closed: false },
	{ day: 'Martes', time: '9:00 – 19:00', closed: false },
	{ day: 'Miércoles', time: '9:00 – 19:00', closed: false },
	{ day: 'Jueves', time: '9:00 – 19:00', closed: false },
	{ day: 'Viernes', time: '9:00 – 19:00', closed: false },
	{ day: 'Sábado', time: '9:00 – 17:00', closed: false },
	{ day: 'Domingo', time: 'Cerrado', closed: true },
] as const;

/** Datos estructurados schema.org (LocalBusiness / HVAC) para el `<head>`. */
export function localBusinessJsonLd(siteUrl: string) {
	const base = siteUrl.replace(/\/$/, '');
	return {
		'@context': 'https://schema.org',
		'@type': ['Store', 'HVACBusiness'],
		'@id': `${base}/#business`,
		name: business.name,
		description: business.description,
		url: base,
		image: `${base}/assets/logo.jpeg`,
		logo: `${base}/assets/logo.jpeg`,
		telephone: business.phoneE164,
		priceRange: '$$',
		currenciesAccepted: 'ARS',
		address: {
			'@type': 'PostalAddress',
			streetAddress: business.streetAddress,
			addressLocality: business.city,
			addressRegion: business.province,
			postalCode: business.postalCode,
			addressCountry: business.countryCode,
		},
		geo: {
			'@type': 'GeoCoordinates',
			latitude: business.geo.latitude,
			longitude: business.geo.longitude,
		},
		hasMap: mapsHref,
		areaServed: { '@type': 'City', name: business.city },
		knowsAbout: [
			'Refrigeración',
			'Aire acondicionado',
			'Repuestos de electrodomésticos',
			'Instalación y mantenimiento de equipos de frío',
		],
		openingHoursSpecification: [
			{
				'@type': 'OpeningHoursSpecification',
				dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
				opens: '09:00',
				closes: '19:00',
			},
			{
				'@type': 'OpeningHoursSpecification',
				dayOfWeek: 'Saturday',
				opens: '09:00',
				closes: '17:00',
			},
		],
	};
}
