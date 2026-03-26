import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms & Conditions — Ameriuse',
  description:
    'Ameriuse terms and conditions. Review the terms governing use of our dealership management platform and messaging services.',
  robots: 'index, follow',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 min-h-0 min-w-0">
            <span className="text-2xl font-extrabold tracking-tight text-gray-900" style={{ fontFamily: '"DM Sans", sans-serif' }}>
              ameriuse
            </span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/privacy" className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 min-h-0 min-w-0">
              Privacy
            </Link>
            <a href="mailto:support@ameriuse.com" className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 min-h-0 min-w-0">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Terms &amp; Conditions</h1>
        <p className="mt-3 text-sm text-gray-500">Effective Date: March 26, 2026 &middot; Last Updated: March 26, 2026</p>

        <div className="prose prose-gray mt-10 max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3 prose-p:leading-relaxed prose-li:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline">

          <p>
            These Terms &amp; Conditions (&quot;Terms&quot;) govern your use of the Ameriuse platform, including the website at ameriuse.com, associated mobile applications, backend services, and dealer websites hosted through the platform (collectively, the &quot;Platform&quot;). By creating an account or using the Platform, you agree to be bound by these Terms. If you do not agree, do not use the Platform.
          </p>
          <p>
            &quot;Ameriuse,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot; refers to the entity operating the Platform. &quot;You&quot; or &quot;User&quot; refers to any individual or entity accessing or using the Platform, including dealership operators, dealership employees, and consumers interacting with dealer websites.
          </p>

          <h2>1. Platform Description</h2>
          <p>
            Ameriuse is a software-as-a-service (SaaS) platform designed for independent automotive dealerships. The Platform provides integrated tools for:
          </p>
          <ul>
            <li>Customer relationship management (CRM) and lead tracking</li>
            <li>Vehicle inventory management, VIN decoding, and pricing</li>
            <li>Public dealer website hosting with customizable templates</li>
            <li>Listing feed generation and inventory syndication</li>
            <li>SMS and email communication with customers</li>
            <li>Vehicle inspection and reconditioning workflow management</li>
            <li>GPS vehicle tracking and lot management</li>
            <li>Analytics, reporting, and operational dashboards</li>
            <li>Appointment scheduling and follow-up automation</li>
          </ul>

          <h2>2. Account Registration and Responsibilities</h2>
          <p>
            To use the Platform, you must create an account and provide accurate, complete registration information. You are responsible for:
          </p>
          <ul>
            <li>Maintaining the confidentiality of your login credentials</li>
            <li>All activity that occurs under your account</li>
            <li>Notifying us immediately of any unauthorized access to your account</li>
            <li>Ensuring that all users within your dealership organization comply with these Terms</li>
          </ul>
          <p>
            We reserve the right to suspend or terminate accounts that violate these Terms, engage in fraudulent activity, or pose a risk to the security of the Platform.
          </p>

          <h2>3. Messaging Program Terms</h2>
          <p>
            The Platform includes SMS and email messaging capabilities that dealerships use to communicate with their customers. This section describes the terms governing these messaging features.
          </p>

          <h3>3.1 Program Description</h3>
          <p>
            Ameriuse-powered dealerships send SMS and email messages to customers who have submitted vehicle inquiries, appointment requests, financing applications, or other contact forms through the dealership&apos;s website or in-person interactions. These messages are transactional and relationship-based, including:
          </p>
          <ul>
            <li>Responses to vehicle inquiries and availability questions</li>
            <li>Appointment confirmations and reminders</li>
            <li>Vehicle status updates (inspection results, reconditioning progress, ready for pickup)</li>
            <li>Follow-up messages related to customer inquiries</li>
            <li>Financing and documentation updates</li>
            <li>Service and recall notifications</li>
          </ul>
          <p>
            Messages are customer-initiated or customer-related. The Platform is not used for unsolicited bulk promotional messaging or spam.
          </p>

          <h3>3.2 Consent</h3>
          <p>
            By submitting a contact form, vehicle inquiry, appointment request, or financing application through an Ameriuse-powered dealer website and providing your phone number, you consent to receive SMS messages from that dealership related to your inquiry or transaction. Consent is specific to the dealership you contacted and the inquiry you submitted.
          </p>
          <p>
            <strong>SMS consent is not a condition of purchase.</strong> You may purchase goods or services from a dealership without consenting to SMS communications.
          </p>
          <p>
            <strong>SMS consent is not shared with third parties or affiliates for marketing purposes.</strong>
          </p>

          <h3>3.3 Message Frequency</h3>
          <p>
            Message frequency varies based on the nature of your inquiry and the dealership&apos;s communication practices. You may receive multiple messages related to an active inquiry, appointment, or transaction. Recurring messages may be sent as part of ongoing customer service.
          </p>

          <h3>3.4 Message and Data Rates</h3>
          <p>
            <strong>Message and data rates may apply.</strong> Standard messaging rates from your wireless carrier apply to all SMS messages sent to or received from the Platform. Ameriuse is not responsible for any charges imposed by your carrier.
          </p>

          <h3>3.5 Opt-Out (STOP)</h3>
          <p>
            You may opt out of SMS messages at any time by replying <strong>STOP</strong> to any message received from a dealership. Upon receiving your STOP request, we will confirm your opt-out and cease sending SMS messages from that dealership. Opting out of SMS does not affect other forms of communication (email, phone calls) unless you separately request those to stop.
          </p>

          <h3>3.6 Help</h3>
          <p>
            For assistance with SMS messages, reply <strong>HELP</strong> to any message or contact us at <a href="mailto:support@ameriuse.com">support@ameriuse.com</a>. You will receive a reply with support contact information.
          </p>

          <h3>3.7 Supported Carriers</h3>
          <p>
            SMS messages are delivered via standard carrier networks. The Platform supports all major U.S. carriers. Carriers are not liable for delayed or undelivered messages.
          </p>

          <h2>4. Acceptable Use</h2>
          <p>You agree not to use the Platform to:</p>
          <ul>
            <li>Violate any applicable law, regulation, or third-party rights</li>
            <li>Send unsolicited bulk messages, spam, or promotional content to individuals who have not consented to receive messages</li>
            <li>Upload or transmit malicious code, viruses, or harmful content</li>
            <li>Attempt to gain unauthorized access to the Platform, other accounts, or connected systems</li>
            <li>Misrepresent your identity, dealership, or the vehicles you list</li>
            <li>Use the Platform to facilitate illegal transactions, including title washing, odometer fraud, or sale of stolen vehicles</li>
            <li>Scrape, crawl, or extract data from the Platform by automated means without our written consent</li>
            <li>Interfere with the security, performance, or availability of the Platform</li>
          </ul>
          <p>
            We reserve the right to investigate and take appropriate action against violations, including account suspension, termination, and reporting to law enforcement.
          </p>

          <h2>5. Dealership Responsibilities</h2>
          <p>Dealership operators who use the Platform agree to:</p>
          <ul>
            <li>Comply with all applicable federal, state, and local laws governing vehicle sales, advertising, consumer protection, and data privacy</li>
            <li>Obtain and maintain proper consent before sending SMS or email communications to customers</li>
            <li>Provide accurate and truthful vehicle listings, including pricing, condition, and history information</li>
            <li>Respond to customer inquiries in a timely and professional manner</li>
            <li>Honor opt-out requests from customers promptly</li>
            <li>Use the Platform&apos;s messaging tools only for legitimate business communication, not for spam or harassment</li>
          </ul>

          <h2>6. Intellectual Property</h2>
          <p>
            The Platform, including its source code, design, features, documentation, and branding, is the property of Ameriuse and is protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, or reverse-engineer any part of the Platform without our written consent.
          </p>
          <p>
            Content that you upload to the Platform (vehicle photos, descriptions, business information) remains your property. By uploading content, you grant Ameriuse a non-exclusive, worldwide license to use, display, and distribute that content as necessary to provide the Platform services, including hosting your dealer website and syndicating your inventory to third-party listing channels.
          </p>

          <h2>7. Subscriptions and Payment</h2>
          <p>
            Access to certain Platform features requires a paid subscription. Subscription plans, pricing, and features are described on our website or in your service agreement. By subscribing, you agree to:
          </p>
          <ul>
            <li>Pay all applicable fees in accordance with your selected plan</li>
            <li>Provide accurate and current billing information</li>
            <li>Accept that subscriptions renew automatically unless canceled before the renewal date</li>
          </ul>
          <p>
            We reserve the right to modify pricing with at least 30 days&apos; notice. Price changes take effect at the start of the next billing cycle.
          </p>

          <h2>8. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law:
          </p>
          <ul>
            <li>The Platform is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, express or implied, including warranties of merchantability, fitness for a particular purpose, or non-infringement.</li>
            <li>Ameriuse shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Platform, including but not limited to loss of revenue, lost profits, loss of data, or business interruption.</li>
            <li>Our total liability for any claim arising from or related to these Terms or the Platform shall not exceed the amount you paid to Ameriuse in the twelve (12) months preceding the claim.</li>
          </ul>
          <p>
            Ameriuse is not responsible for the actions, statements, or business practices of individual dealerships using the Platform. Each dealership operates independently and is solely responsible for its own compliance with applicable laws.
          </p>

          <h2>9. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless Ameriuse, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including reasonable attorney&apos;s fees) arising out of or related to:
          </p>
          <ul>
            <li>Your use of the Platform</li>
            <li>Your violation of these Terms</li>
            <li>Your violation of any applicable law or third-party rights</li>
            <li>Content you upload to or transmit through the Platform</li>
          </ul>

          <h2>10. Termination</h2>
          <p>
            You may close your account at any time by contacting us at <a href="mailto:support@ameriuse.com">support@ameriuse.com</a>. We may suspend or terminate your access to the Platform at any time for violation of these Terms, non-payment, or any other reason at our reasonable discretion.
          </p>
          <p>
            Upon termination, your right to use the Platform ceases immediately. We will retain your data for a reasonable period (up to 90 days) to allow for reactivation or data export, after which it will be permanently deleted.
          </p>

          <h2>11. Dispute Resolution</h2>
          <p>
            Any dispute arising out of or relating to these Terms or the Platform shall be resolved through good-faith negotiation between the parties. If the dispute cannot be resolved through negotiation within 30 days, either party may pursue resolution through binding arbitration or in a court of competent jurisdiction in the State of California.
          </p>

          <h2>12. Governing Law</h2>
          <p>
            These Terms are governed by and construed in accordance with the laws of the State of California, without regard to its conflict-of-law principles.
          </p>

          <h2>13. Modifications</h2>
          <p>
            We may update these Terms from time to time. When we make material changes, we will update the &quot;Last Updated&quot; date at the top of this page and, where appropriate, notify you via email or in-platform notification. Continued use of the Platform after changes constitutes acceptance of the updated Terms.
          </p>

          <h2>14. Severability</h2>
          <p>
            If any provision of these Terms is found to be unenforceable or invalid by a court of competent jurisdiction, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall continue in full force and effect.
          </p>

          <h2>15. Contact</h2>
          <p>
            If you have questions about these Terms, please contact us:
          </p>
          <ul>
            <li><strong>Email:</strong> <a href="mailto:support@ameriuse.com">support@ameriuse.com</a></li>
            <li><strong>Company:</strong> Ameriuse</li>
            <li><strong>Website:</strong> <a href="https://ameriuse.com">https://ameriuse.com</a></li>
          </ul>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-gray-50 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Ameriuse. All rights reserved.</p>
            <nav className="flex items-center gap-6">
              <Link href="/" className="text-sm text-gray-500 transition-colors hover:text-gray-900 min-h-0 min-w-0">Home</Link>
              <Link href="/privacy" className="text-sm text-gray-500 transition-colors hover:text-gray-900 min-h-0 min-w-0">Privacy Policy</Link>
              <a href="mailto:support@ameriuse.com" className="text-sm text-gray-500 transition-colors hover:text-gray-900 min-h-0 min-w-0">Support</a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
