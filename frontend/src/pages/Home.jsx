import {
  Zap,
  Globe2,
  QrCode,
  ShieldCheck,
  MousePointerClick,
  MapPin,
  Link2,
} from 'lucide-react'


const trustedLogos = [
  'ACME',
  'VERCEL',
  'STRIPE',
  'NOTION',
  'LINEAR',
]


const features = [
  {
    icon: Zap,
    title: 'Fast Link Routing',
    description:
      'Create short links that redirect visitors quickly while capturing useful click analytics.',
  },
  {
    icon: Globe2,
    title: 'Real-Time Click Streams',
    description:
      'Track clicks with useful source, geographic, and visitor information for every link.',
  },
  {
    icon: QrCode,
    title: 'QR Codes & Custom Slugs',
    description:
      'Create memorable custom aliases and generate scannable QR codes for your links.',
  },
]


const steps = [
  {
    n: '01',
    title: 'Paste Destination & Custom Alias',
    body:
      'Enter any long-form URL and optionally choose a custom alias for your short link.',
  },
  {
    n: '02',
    title: 'Deploy Short Link or QR Code',
    body:
      'Share your compact URL or generate a QR code for digital and physical campaigns.',
  },
  {
    n: '03',
    title: 'Inspect Click Analytics',
    body:
      'Monitor clicks with referrer, geographic, and device information through LinkPulse analytics.',
  },
]

// --------------------------------------------------
// Preview Stat Row
// --------------------------------------------------

const previewStats = [
  {
    icon: MousePointerClick,
    label: 'Total Clicks',
    value: '12,480',
  },
  {
    icon: MapPin,
    label: 'Countries Reached',
    value: '38',
  },
  {
    icon: Link2,
    label: 'Active Links',
    value: '214',
  },
]

// --------------------------------------------------
// Home Component
// --------------------------------------------------

export default function Home() {
  return (
    <div className="bg-navy-950 min-h-screen">

      {/* ==========================================
          HERO
      ========================================== */}

      <section className="relative overflow-hidden">

        {/* Background Glow */}
        <div
          className="
            absolute inset-0
            bg-[radial-gradient(circle_at_20%_-10%,rgba(31,191,143,0.18),transparent_45%)]
          "
        />

        <div
          className="
            max-w-7xl
            mx-auto
            px-4
            sm:px-6
            pt-8
            pb-20
            relative
          "
        >

          {/* ======================================
              NAVBAR
          ====================================== */}

          <nav className="flex items-center justify-between mb-16">

            {/* Logo */}
            <div className="flex items-center gap-2">

              <div
                className="
                  w-7
                  h-7
                  rounded-lg
                  bg-white/10
                  flex
                  items-center
                  justify-center
                  text-accent-light
                "
              >
                <Zap className="w-4 h-4" />
              </div>

              <span className="text-white font-bold tracking-tight">
                LinkPulse
              </span>

              <span
                className="
                  hidden
                  sm:inline
                  text-[10px]
                  text-white/40
                  font-medium
                  ml-1
                "
              >
                v2.0 telemetry
              </span>

            </div>

            {/* Navigation Links */}
            <div
              className="
                hidden
                md:flex
                items-center
                gap-6
                text-sm
                text-white/60
              "
            >

              <a
                href="#features"
                className="hover:text-white transition-colors"
              >
                Features
              </a>

              <a
                href="#workflow"
                className="hover:text-white transition-colors"
              >
                Workflow
              </a>

            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">

              <a
                href="/login"
                className="
                  hidden
                  sm:inline
                  text-sm
                  text-white/70
                  hover:text-white
                  transition-colors
                "
              >
                Log in
              </a>

              <a
                href="/login"
                className="
                  bg-accent
                  hover:bg-accent-dark
                  text-white
                  text-sm
                  font-semibold
                  px-4
                  py-2
                  rounded-xl
                  transition-colors
                "
              >
                Get Started
              </a>

            </div>

          </nav>

          {/* ======================================
              HERO CONTENT
          ====================================== */}

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* --------------------------------------
                LEFT SIDE
            -------------------------------------- */}

            <div>

              {/* Badge */}
              <span
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  text-xs
                  font-medium
                  text-accent-light
                  bg-white/5
                  border
                  border-white/10
                  rounded-full
                  px-3
                  py-1
                  mb-5
                "
              >
                <ShieldCheck className="w-3 h-3" />

                Secure Link Analytics
              </span>

              {/* Heading */}
              <h1
                className="
                  text-4xl
                  sm:text-5xl
                  font-bold
                  text-white
                  leading-tight
                  tracking-tight
                  mb-5
                "
              >
                Shorten links.

                <br />

                <span className="text-accent-light">
                  Understand
                </span>{' '}
                every click.
              </h1>

              {/* Description */}
              <p
                className="
                  text-white/60
                  text-base
                  leading-relaxed
                  max-w-md
                  mb-7
                "
              >
                LinkPulse makes it easy to create short,
                shareable links and turn every click into
                useful analytics with source, country,
                and visitor information.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3 mb-6">

                <a
                  href="/login"
                  className="
                    bg-accent
                    hover:bg-accent-dark
                    text-white
                    text-sm
                    font-semibold
                    px-5
                    py-3
                    rounded-xl
                    transition-colors
                    inline-flex
                    items-center
                    gap-2
                  "
                >
                  Get Started Free

                  <Zap className="w-4 h-4" />
                </a>

                <a
                  href="/login"
                  className="
                    text-white/80
                    hover:text-white
                    text-sm
                    font-semibold
                    px-5
                    py-3
                    rounded-xl
                    border
                    border-white/15
                    hover:bg-white/5
                    transition-colors
                  "
                >
                  Log In
                </a>

              </div>

              {/* Small Feature Text */}
              <p className="text-xs text-white/35">
                Create short links · Generate QR codes · Track clicks
              </p>

            </div>

            {/* --------------------------------------
                RIGHT SIDE - PRODUCT PREVIEW
            -------------------------------------- */}

            <div
              className="
                rounded-2xl
                bg-white/[0.04]
                border
                border-white/10
                shadow-2xl
                p-6
              "
            >

              {/* Preview Header */}
              <div className="flex items-center justify-between mb-6">

                <span className="text-white font-semibold text-sm">
                  Live Analytics Preview
                </span>

                <span
                  className="
                    text-[10px]
                    font-medium
                    text-accent-light
                    bg-accent/10
                    border
                    border-accent/20
                    rounded-full
                    px-2
                    py-0.5
                  "
                >
                  Sample data
                </span>

              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-6">

                {previewStats.map((stat) => {
                  const Icon = stat.icon

                  return (
                    <div
                      key={stat.label}
                      className="
                        bg-white/[0.03]
                        border
                        border-white/10
                        rounded-xl
                        p-4
                      "
                    >

                      <Icon
                        className="
                          w-4
                          h-4
                          text-accent-light
                          mb-3
                        "
                      />

                      <p className="text-white font-bold text-lg">
                        {stat.value}
                      </p>

                      <p className="text-white/40 text-[11px] mt-0.5">
                        {stat.label}
                      </p>

                    </div>
                  )
                })}

              </div>

              {/* Analytics Chart */}
              <div
                className="
                  h-24
                  rounded-xl
                  bg-gradient-to-t
                  from-accent/10
                  to-transparent
                  border
                  border-white/5
                  flex
                  items-end
                  gap-1.5
                  p-3
                "
              >
                {[
                  40,
                  65,
                  35,
                  80,
                  55,
                  90,
                  60,
                  75,
                  45,
                  95,
                  70,
                  85,
                ].map((height, index) => (
                  <div
                    key={index}
                    className="
                      flex-1
                      bg-accent/50
                      rounded-t
                    "
                    style={{
                      height: `${height}%`,
                    }}
                  />
                ))}
              </div>

              {/* Preview Footer */}
              <p className="text-white/30 text-[11px] mt-4 text-center">
                Sign in to create and track your own links
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ==========================================
          TRUSTED BY
      ========================================== */}

      <section
        className="
          bg-navy-950
          border-t
          border-white/5
          py-8
        "
      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <p
            className="
              text-center
              text-[11px]
              font-medium
              text-white/30
              mb-5
            "
          >
            Built for creators, developers, marketers,
            and modern teams
          </p>

          <div
            className="
              flex
              flex-wrap
              items-center
              justify-center
              gap-x-10
              gap-y-3
            "
          >

            {trustedLogos.map((logo) => (
              <span
                key={logo}
                className="
                  text-white/25
                  text-sm
                  font-bold
                  tracking-widest
                "
              >
                {logo}
              </span>
            ))}

          </div>

        </div>

      </section>

      {/* ==========================================
          FEATURES
      ========================================== */}

      <section
        id="features"
        className="
          bg-navy-950
          py-16
          border-t
          border-white/5
        "
      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* Section Heading */}
          <div
            className="
              text-center
              max-w-xl
              mx-auto
              mb-12
            "
          >

            <h2
              className="
                text-2xl
                sm:text-3xl
                font-bold
                text-white
                mb-3
              "
            >
              Everything you need for smarter links
            </h2>

            <p className="text-white/50 text-sm">
              Create short URLs, generate QR codes,
              and understand how visitors interact
              with your links.
            </p>

          </div>

          {/* Feature Cards */}
          <div className="grid sm:grid-cols-3 gap-4">

            {features.map((feature) => {
              const Icon = feature.icon

              return (
                <div
                  key={feature.title}
                  className="
                    bg-white/[0.03]
                    border
                    border-white/10
                    rounded-2xl
                    p-6
                    hover:border-white/20
                    transition-colors
                  "
                >

                  {/* Icon */}
                  <div
                    className="
                      w-9
                      h-9
                      rounded-xl
                      bg-accent/15
                      text-accent-light
                      flex
                      items-center
                      justify-center
                      mb-4
                    "
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  {/* Title */}
                  <h3
                    className="
                      text-white
                      font-semibold
                      text-sm
                      mb-2
                    "
                  >
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="
                      text-white/45
                      text-sm
                      leading-relaxed
                    "
                  >
                    {feature.description}
                  </p>

                </div>
              )
            })}

          </div>

        </div>

      </section>

      {/* ==========================================
          WORKFLOW
      ========================================== */}

      <section
        id="workflow"
        className="
          bg-[#0D1226]
          py-16
          border-t
          border-white/5
        "
      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* Section Heading */}
          <div className="text-center mb-12">

            <p
              className="
                text-accent-light
                text-xs
                font-semibold
                tracking-wide
                mb-2
              "
            >
              Simple workflow
            </p>

            <h2
              className="
                text-2xl
                sm:text-3xl
                font-bold
                text-white
              "
            >
              From long URL to useful insight
            </h2>

          </div>

          {/* Steps */}
          <div className="grid sm:grid-cols-3 gap-4">

            {steps.map((step) => (
              <div
                key={step.n}
                className="
                  bg-navy-900
                  border
                  border-white/5
                  rounded-2xl
                  p-6
                "
              >

                {/* Step Number */}
                <span
                  className="
                    text-xs
                    font-bold
                    text-accent-light
                    bg-accent/10
                    rounded-md
                    px-2
                    py-1
                  "
                >
                  {step.n}
                </span>

                {/* Step Title */}
                <h3
                  className="
                    text-white
                    font-semibold
                    text-sm
                    mt-4
                    mb-2
                  "
                >
                  {step.title}
                </h3>

                {/* Step Description */}
                <p
                  className="
                    text-white/45
                    text-sm
                    leading-relaxed
                  "
                >
                  {step.body}
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* ==========================================
          CTA
      ========================================== */}

      <section
        className="
          bg-[#0D1226]
          pb-20
          pt-4
        "
      >

        <div
          className="
            max-w-4xl
            mx-auto
            px-4
            sm:px-6
          "
        >

          <div
            className="
              bg-gradient-to-br
              from-navy-800
              to-navy-900
              border
              border-white/10
              rounded-2xl
              p-10
              text-center
            "
          >

            {/* CTA Heading */}
            <h2
              className="
                text-white
                text-2xl
                font-bold
                mb-2
              "
            >
              Ready to understand your links?
            </h2>

            {/* CTA Description */}
            <p
              className="
                text-white/50
                text-sm
                mb-6
              "
            >
              Create a LinkPulse short URL and start
              tracking clicks with useful analytics.
            </p>

            {/* CTA Buttons */}
            <div
              className="
                flex
                flex-wrap
                items-center
                justify-center
                gap-3
              "
            >

              <a
                href="/login"
                className="
                  bg-accent
                  hover:bg-accent-dark
                  text-white
                  text-sm
                  font-semibold
                  px-5
                  py-3
                  rounded-xl
                  transition-colors
                "
              >
                Get Started Free
              </a>

              <a
                href="/login"
                className="
                  text-white/80
                  hover:text-white
                  text-sm
                  font-semibold
                  px-5
                  py-3
                  rounded-xl
                  border
                  border-white/15
                  hover:bg-white/5
                  transition-colors
                "
              >
                Sign In
              </a>

            </div>

            {/* CTA Footer */}
            <p
              className="
                text-[11px]
                text-white/30
                mt-4
              "
            >
              Create your first short link in seconds.
            </p>

          </div>

        </div>

      </section>

    </div>
  )
}