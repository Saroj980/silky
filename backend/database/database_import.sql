-- MySQL dump for Silky Textiles (u987305190_silkyup)
-- Suitable for phpMyAdmin 1-Click Import

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- --------------------------------------------------------
-- Table structure for `users`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL UNIQUE,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Default Admin User (Password: password123 or admin)
-- --------------------------------------------------------
INSERT INTO `users` (`id`, `name`, `email`, `password`, `created_at`, `updated_at`) VALUES
(1, 'Silky Admin', 'admin@silky.ae', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', NOW(), NOW())
ON DUPLICATE KEY UPDATE `email` = VALUES(`email`);

-- --------------------------------------------------------
-- Table structure for `hero_slides`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `hero_slides` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `tagline` varchar(255) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `primaryBtnText` varchar(255) DEFAULT NULL,
  `primaryBtnHref` varchar(255) DEFAULT NULL,
  `secondaryBtnText` varchar(255) DEFAULT NULL,
  `secondaryBtnHref` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `imageAlt` varchar(255) DEFAULT NULL,
  `badgeText` varchar(255) DEFAULT NULL,
  `trustBadges` text DEFAULT NULL,
  `textColor` varchar(255) DEFAULT '#1F2A37',
  `textAlignment` varchar(255) DEFAULT 'Left',
  `overlayEnabled` varchar(255) DEFAULT 'true',
  `overlayOpacity` varchar(255) DEFAULT '60',
  `status` varchar(255) DEFAULT 'Active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `hero_slides` (`id`, `tagline`, `title`, `description`, `primaryBtnText`, `primaryBtnHref`, `secondaryBtnText`, `secondaryBtnHref`, `image`, `imageAlt`, `badgeText`, `trustBadges`, `textColor`, `textAlignment`, `overlayEnabled`, `overlayOpacity`, `status`) VALUES
(1, 'Established in Dubai • Since 1963', 'Bespoke Master Tailoring & Executive Suiting', 'Handcrafted 2-piece & 3-piece suits, blazers, tuxedos, and traditional Kanduras tailored with six decades of Dubai master craftsmanship.', 'Request Custom Quote', '#contact', 'Visit Showroom', '#contact', '/images/hero_bespoke_suit.png', 'Master Tailor Crafting Bespoke Suit in Dubai Atelier', 'Bespoke Tailoring Workshop • Deira Creek, Dubai', '["24 Hrs Express Fitting","Made to Measure Suits","Italian Super Wool Fabrics","Doorstep Delivery in UAE"]', '#1F2A37', 'Left', 'true', '60', 'Active'),
(2, 'Enterprise & Hospitality Supply', 'Corporate & Luxury Uniform Solutions', 'Turnkey uniform manufacturing for UAE hotels, corporate fleets, medical clinics, and retail teams with precision in-house embroidery.', 'Get Bulk Quote', '#contact', 'Explore Sectors', '#services', '/images/hero_corporate_uniforms.png', 'Corporate Executives & Hotel Staff in Custom Uniforms', 'Corporate Uniform Factory Direct • Dubai, UAE', '["ISO 9001:2015 Certified","In-House Embroidery","Tailored Staff Fitting","All 7 Emirates Delivery"]', '#1F2A37', 'Left', 'true', '60', 'Active'),
(3, 'Wholesale & Retail Sourcing', 'Italian Super Wools & Fine Textiles', 'Direct importer of Italian Super 150s wools, 100% Egyptian cottons, linen blends, and industrial fire-retardant enterprise fabrics.', 'Explore Fabrics', '#services', 'Contact Sourcing', '#contact', '/images/hero_textile_fabrics.png', 'High-End Textile Fabric Rolls in Showroom', 'Textile Fabric Sourcing & Wholesale • Dubai', '["Italian Super Wools","100% Pure Egyptian Cotton","Industrial Tech Fabrics","Showroom Samples"]', '#1F2A37', 'Left', 'true', '60', 'Active');

-- --------------------------------------------------------
-- Table structure for `site_configs`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `site_configs` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `logoUrl` varchar(255) DEFAULT '/silky-logo.png',
  `logoAlt` varchar(255) DEFAULT 'Silky Logo',
  `topBarText` text DEFAULT NULL,
  `phone` varchar(255) DEFAULT '+971 4 226 8866',
  `email` varchar(255) DEFAULT 'info@silky.ae',
  `whatsapp` varchar(255) DEFAULT '+971 50 123 4567',
  `navLinks` text DEFAULT NULL,
  `primaryColor` varchar(255) DEFAULT '#DE7B3D',
  `bgColor` varchar(255) DEFAULT '#F7F5F2',
  `textColor` varchar(255) DEFAULT '#1F2A37',
  `headingFont` varchar(255) DEFAULT 'inter',
  `bodyFont` varchar(255) DEFAULT 'inter',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `site_configs` (`id`, `logoUrl`, `logoAlt`, `topBarText`, `phone`, `email`, `whatsapp`, `navLinks`, `primaryColor`, `bgColor`, `textColor`, `headingFont`, `bodyFont`) VALUES
(1, '/silky-logo.png', 'Silky Textiles Dubai', 'Direct Wholesale & Uniform Manufacturer • Serving UAE & GCC Since 1963', '+971 4 226 8866', 'info@silky.ae', '+971 50 123 4567', '[{"id":"m-home","title":"HOME","url":"/","children":[]},{"id":"m-uniform-fleets","title":"UNIFORM FLEETS","url":"#","children":[{"id":"sub-1","title":"100% Pure Cotton Shirts","url":"/products/pure-cotton-shirts-supplier-in-uae"},{"id":"item-1791659864550","title":"Test","url":"/products/test"}]},{"id":"item-1791483655885","title":"ABOUT","url":"/about","children":[]},{"id":"m-custom-apparel","title":"CUSTOM APPAREL","url":"#","children":[]},{"id":"m-contact","title":"CONTACT US","url":"/contact-us","children":[]}]', '#DE7B3D', '#F7F5F2', '#1F2A37', 'inter', 'inter');

-- --------------------------------------------------------
-- Table structure for `page_sections`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `page_sections` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `order` int(11) DEFAULT 0,
  `data` longtext DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT 1,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for `product_pages`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `product_pages` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `slug` varchar(255) NOT NULL UNIQUE,
  `title` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `heroImage` varchar(255) NOT NULL,
  `metaTitle` varchar(255) DEFAULT NULL,
  `metaDescription` text DEFAULT NULL,
  `isPublished` tinyint(1) DEFAULT 1,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `product_pages` (`id`, `slug`, `title`, `category`, `heroImage`, `metaTitle`, `metaDescription`, `isPublished`) VALUES
(1, 'pure-cotton-shirts-supplier-in-uae', '100% Pure Cotton Shirts Supplier in UAE', 'Corporate Apparel', '/images/textile_fabric_rolls.png', '100% Pure Cotton Shirts Supplier in UAE | Silky Textiles Dubai', 'Direct manufacturer and supplier of 100% Pure Cotton Shirts in Dubai, UAE.', 1),
(32, 'test', 'Test', 'Corporate Uniforms & Fine Shirting', '/images/textile_fabric_rolls.png', 'Test | Silky Textiles Dubai', 'Test product page', 1);

-- --------------------------------------------------------
-- Table structure for `product_page_sections`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `product_page_sections` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_page_id` bigint(20) UNSIGNED NOT NULL,
  `type` varchar(255) NOT NULL,
  `order` int(11) DEFAULT 0,
  `isActive` tinyint(1) DEFAULT 1,
  `data` longtext NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `product_page_sections_product_page_id_foreign` (`product_page_id`),
  CONSTRAINT `product_page_sections_product_page_id_foreign` FOREIGN KEY (`product_page_id`) REFERENCES `product_pages` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS=1;
COMMIT;
