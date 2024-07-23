-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Jul 23, 2024 at 12:07 PM
-- Server version: 8.3.0
-- PHP Version: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hayatpack`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity_log`
--

CREATE TABLE `activity_log` (
  `id` bigint UNSIGNED NOT NULL,
  `log_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `subject_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `event` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subject_id` bigint UNSIGNED DEFAULT NULL,
  `causer_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `causer_id` bigint UNSIGNED DEFAULT NULL,
  `properties` json DEFAULT NULL,
  `batch_uuid` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `beds`
--

CREATE TABLE `beds` (
  `id` bigint UNSIGNED NOT NULL,
  `room_id` int UNSIGNED NOT NULL,
  `id_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `doctor_reports`
--

CREATE TABLE `doctor_reports` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` int UNSIGNED NOT NULL,
  `attachment_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `attachment_path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `attachment_size` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `details` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `expenses`
--

CREATE TABLE `expenses` (
  `id` bigint UNSIGNED NOT NULL,
  `item` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `entry_date` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `responsible` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `leader` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `paid_amount` double NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `incomes`
--

CREATE TABLE `incomes` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `entry_date` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` double NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `languages`
--

CREATE TABLE `languages` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abbr` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `direction` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `languages`
--

INSERT INTO `languages` (`id`, `name`, `abbr`, `direction`, `created_at`, `updated_at`) VALUES
(1, 'Dari', 'da', 'rtl', '2022-12-14 07:01:43', '2022-12-14 07:03:41'),
(6, 'Pashto', 'pas', 'rtl', '2022-12-15 06:50:12', '2022-12-15 06:50:48');

-- --------------------------------------------------------

--
-- Table structure for table `language_dictionaries`
--

CREATE TABLE `language_dictionaries` (
  `id` bigint UNSIGNED NOT NULL,
  `language_id` bigint UNSIGNED NOT NULL,
  `word` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `translate` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `language_dictionaries`
--

INSERT INTO `language_dictionaries` (`id`, `language_id`, `word`, `translate`, `created_at`, `updated_at`) VALUES
(6, 1, 'Add new word', 'افزودن لغت جدید', '2022-12-14 07:04:07', '2022-12-14 07:04:07'),
(11, 1, '[language] language dictionary', 'ذخیره لغات زبان [language]', '2022-12-14 10:07:41', '2022-12-15 05:37:31'),
(12, 1, 'Add language', 'اضافه نمودن زبان', '2022-12-14 11:35:05', '2022-12-14 11:35:05'),
(13, 1, 'Dari', 'دری', '2022-12-15 05:36:50', '2022-12-15 05:36:50'),
(15, 6, '[language] language dictionary', 'ده [language] ژبه لغاتونه', '2022-12-15 06:51:56', '2022-12-15 07:01:31'),
(16, 6, 'Add new word', 'نوی لغت اضافه کول', '2022-12-15 06:55:34', '2022-12-15 06:55:34'),
(17, 6, 'Pashto', 'پشتو', '2022-12-15 06:56:08', '2022-12-15 06:56:08'),
(18, 1, 'Pashto', 'پشتو', '2022-12-15 08:41:47', '2022-12-15 08:41:47'),
(19, 1, 'Dashboard', 'داشبورد', '2022-12-15 09:07:02', '2022-12-15 09:07:02'),
(20, 1, 'User management', 'مدریت استفاده کننده ها', '2022-12-15 09:07:24', '2022-12-17 11:15:05'),
(21, 1, 'Configuration', 'تنظیمات', '2022-12-15 09:08:22', '2022-12-15 09:08:22'),
(22, 1, 'Word', 'لغت', '2022-12-15 09:16:19', '2022-12-15 09:16:19'),
(23, 1, 'Translate', 'ترجمه', '2022-12-15 09:16:36', '2022-12-15 09:16:36'),
(24, 1, 'Created at', 'ایجاد شده در', '2022-12-15 09:17:01', '2022-12-15 09:17:01'),
(25, 1, 'Actions', 'اجرآت', '2022-12-15 09:17:49', '2022-12-15 09:17:49'),
(26, 1, 'ID', 'آی دی', '2022-12-15 09:18:05', '2022-12-15 09:18:05'),
(27, 1, 'NO#', 'شماره', '2022-12-15 09:18:24', '2022-12-15 09:19:10'),
(28, 1, 'Collapse \r\nsidebar', 'بسته نمودن ساید بار', '2022-12-17 04:55:19', '2022-12-17 04:55:33'),
(29, 1, 'Language', 'زبان', '2022-12-17 04:55:59', '2022-12-17 04:55:59'),
(30, 1, 'My profile', 'پروفایل من', '2022-12-17 04:56:45', '2022-12-17 04:56:45'),
(31, 1, 'Logout', 'خروج از سیستم', '2022-12-17 04:57:00', '2022-12-17 04:57:00'),
(32, 1, 'Users', 'استفاده کننده ها', '2022-12-17 04:57:54', '2022-12-17 04:57:54'),
(33, 1, 'Roles', 'صلاحیت ها', '2022-12-17 04:59:17', '2022-12-17 04:59:17'),
(34, 1, 'List users', 'لیست استفاده کننده ها', '2022-12-17 05:03:27', '2022-12-17 05:03:27'),
(35, 1, 'Add new user', 'ایجاد یوزر جدید', '2022-12-17 05:04:11', '2022-12-17 05:04:11'),
(36, 1, 'Name', 'اسم', '2022-12-17 05:04:46', '2022-12-17 05:04:46'),
(37, 1, 'Email', 'ایمیل', '2022-12-17 05:04:57', '2022-12-17 05:04:57'),
(38, 1, 'Status', 'حالت', '2022-12-17 05:05:10', '2022-12-17 05:05:10'),
(39, 1, 'Phone number', 'شماره تماس', '2022-12-17 05:05:26', '2022-12-17 05:05:26'),
(40, 1, 'Search', 'جستجو', '2022-12-17 05:09:18', '2022-12-17 05:09:18'),
(41, 1, 'Number of record', 'تعداد نمایش عداد در صفحه', '2022-12-17 05:11:09', '2022-12-17 05:11:09'),
(42, 1, 'No record found', 'هیج نو معلومات دریافت نشد', '2022-12-17 05:12:12', '2022-12-17 05:12:12'),
(43, 1, 'Hello - [first_name] [last_name]', 'سلام [first_name] [last_name]', '2022-12-17 05:13:50', '2022-12-17 05:13:50'),
(44, 1, 'User Form', 'فورم استفاده کننده ها', '2022-12-17 05:18:40', '2022-12-17 05:18:40'),
(45, 1, 'Profile picture', 'عکس استفاده کننده', '2022-12-17 05:19:13', '2022-12-17 05:19:13'),
(46, 1, 'First name', 'اسم', '2022-12-17 05:19:36', '2022-12-17 05:19:36'),
(47, 1, 'Last name', 'تخلص', '2022-12-17 05:19:52', '2022-12-17 05:19:52'),
(48, 1, 'Password', 'رمز', '2022-12-17 05:20:34', '2022-12-17 05:20:34'),
(49, 1, 'Confirm password', 'تاییدی رمز', '2022-12-17 05:20:50', '2022-12-17 05:20:50'),
(50, 1, 'Show password', 'نمایش رمز', '2022-12-17 05:21:06', '2022-12-17 05:21:06'),
(51, 1, 'Save', 'ثبت', '2022-12-17 05:21:32', '2022-12-17 05:21:32'),
(52, 1, 'Close', 'بستن', '2022-12-17 05:21:44', '2022-12-17 05:21:44'),
(53, 1, 'Active', 'فعلل', '2022-12-17 05:27:00', '2022-12-17 05:27:00'),
(54, 1, 'Inactive', 'غیر فعال', '2022-12-17 05:27:14', '2022-12-17 05:27:14'),
(55, 1, 'Super admin', 'ادیمن عمومی', '2022-12-17 08:25:52', '2022-12-17 08:25:52'),
(56, 1, 'Updated successfully', 'موفقانه تجدید گردید', '2022-12-17 10:09:47', '2022-12-17 10:26:33'),
(57, 1, 'Are you sure you want to delete', 'آیا شما مطمین هستید', '2022-12-17 10:34:27', '2022-12-17 10:34:27'),
(58, 1, 'List of roles', 'لیست صلاحیت ها', '2022-12-17 10:36:00', '2022-12-17 10:36:53'),
(59, 1, 'Create role group', 'ایجاد گروپ جدید برای صلاحیت ها', '2022-12-17 10:37:45', '2022-12-17 10:37:45'),
(60, 1, 'Admins', 'مدیران', '2022-12-17 10:38:30', '2022-12-17 10:38:30'),
(61, 1, 'Role group', 'گروپ صلاحیت ها', '2022-12-17 10:44:37', '2022-12-17 10:44:37'),
(62, 1, 'Role', 'صلاحیت', '2022-12-17 10:45:10', '2022-12-17 10:45:10'),
(63, 1, 'Role group name', 'اسم گروپ صلاحت ها', '2022-12-17 10:45:43', '2022-12-17 10:45:43'),
(64, 1, 'Role name', 'اسم صلاحیت', '2022-12-17 10:45:59', '2022-12-17 10:45:59'),
(65, 1, 'The name field is required.', 'بخش اسم ضرور میباشد', '2022-12-17 10:53:50', '2022-12-17 10:53:50'),
(66, 1, 'Role details', 'جزیات صلاحیت', '2022-12-17 10:57:38', '2022-12-17 10:57:38'),
(67, 1, 'Created by', 'ایجاد شده توسط', '2022-12-17 10:58:26', '2022-12-17 10:58:26'),
(68, 1, 'Updated by', 'تجدید شده توسط', '2022-12-17 10:58:43', '2022-12-17 10:58:43'),
(69, 1, 'Role all assigned permissions', 'تمام دسترسی های موجود', '2022-12-17 11:00:22', '2022-12-17 11:00:22'),
(70, 1, 'Permissions', 'دسترسی ها', '2022-12-17 11:02:59', '2022-12-17 11:02:59'),
(71, 1, 'Groups', 'گروپ ها', '2022-12-17 11:03:26', '2022-12-17 11:03:26'),
(72, 1, 'Access', 'اجازه', '2022-12-17 11:05:07', '2022-12-17 11:05:07'),
(73, 1, 'Create user', 'ایجاد یوزر', '2022-12-17 11:06:11', '2022-12-17 11:06:11'),
(74, 1, 'Edit user', 'تجدید یوزر', '2022-12-17 11:06:25', '2022-12-17 11:06:25'),
(75, 1, 'Delete user', 'حذف یوزر', '2022-12-17 11:06:45', '2022-12-17 11:06:45'),
(76, 1, 'View profile', 'مشاهده جزیات یوزر', '2022-12-17 11:07:17', '2022-12-17 11:07:32'),
(77, 1, 'View role details', 'مشاهده جزیات صلاحیت', '2022-12-17 11:08:14', '2022-12-17 11:08:14'),
(78, 1, 'Create role', 'ایجاد صلاحیت', '2022-12-17 11:08:28', '2022-12-17 11:08:28'),
(79, 1, 'Edit role', 'تجدید صلاحیت', '2022-12-17 11:08:46', '2022-12-17 11:08:46'),
(80, 1, 'Delete role', 'حذف صلاحیت', '2022-12-17 11:09:01', '2022-12-17 11:09:01'),
(81, 1, 'Create language', 'ایجاد زبان', '2022-12-17 11:09:42', '2022-12-17 11:09:42'),
(82, 1, 'Edit language name', 'تجدید اسم زبان', '2022-12-17 11:10:07', '2022-12-17 11:10:07'),
(83, 1, 'Delete language', 'حذف زبان', '2022-12-17 11:10:22', '2022-12-17 11:10:22'),
(84, 1, 'Language dictionary', 'ذخیره لغات زبان', '2022-12-17 11:10:57', '2022-12-17 11:10:57'),
(85, 1, 'Add new word to dictionary', 'اضافه کردن لغت جدید در ذخیره لغات', '2022-12-17 11:11:57', '2022-12-17 11:11:57'),
(86, 1, 'Edit word', 'تجدید لغت', '2022-12-17 11:12:13', '2022-12-17 11:12:13'),
(87, 1, 'Delete word', 'حذف لغت', '2022-12-17 11:12:28', '2022-12-17 11:12:28'),
(88, 1, 'This is user management section', 'بخش مدریت استفاده کننده ها', '2022-12-17 11:14:28', '2022-12-17 11:14:28'),
(89, 1, 'Welcome to configuration page', 'خوش آمدید به صفحه تنظیمات', '2022-12-17 11:16:04', '2022-12-17 11:16:04'),
(90, 1, 'Languages', 'زبان ها', '2022-12-17 11:19:04', '2022-12-17 11:19:04'),
(91, 1, 'Are you sure you want to delete this group', 'آیا شما مطمین هستید که میخواهد ای گروپ ره حذف نمایید', '2022-12-17 11:20:04', '2022-12-17 11:21:42'),
(92, 1, 'Are you sure you want to delete this role?', 'آیا شما مطمین هستید که میخواهید ای صلاحیت ره حذف نمایید', '2022-12-17 11:22:32', '2022-12-17 11:22:32'),
(93, 1, 'Language list', 'لیست زبان ها', '2022-12-17 11:23:14', '2022-12-17 11:23:14'),
(94, 1, 'Language form', 'فورم زبان', '2022-12-17 11:26:08', '2022-12-17 11:26:08'),
(95, 1, 'Language name', 'اسم زبان', '2022-12-17 11:26:49', '2022-12-17 11:26:49'),
(96, 1, 'Language abbreviation', 'مخفف زبان', '2022-12-17 11:27:05', '2022-12-17 11:27:05'),
(97, 1, 'Direction', 'مسیر صفحه', '2022-12-17 11:27:26', '2022-12-17 11:27:26'),
(98, 1, 'Right to left', 'راست به چپ', '2022-12-17 11:27:41', '2022-12-17 11:27:41'),
(99, 1, 'Left to right', 'چپ به راست', '2022-12-17 11:27:55', '2022-12-17 11:27:55'),
(100, 1, 'Welcome to the Dashboard', 'خوش آمدید به صفحه اصلی', '2022-12-17 11:30:31', '2022-12-17 11:30:31'),
(101, 1, 'Mr/Mrs [last_name] profile details', 'جزیات محترم\\محترمه [last_name]', '2022-12-18 09:12:49', '2022-12-18 09:12:49'),
(102, 1, 'User details', 'جزیات بیشتر استفاده کننده', '2022-12-19 06:01:00', '2022-12-19 06:01:00'),
(103, 1, 'User profile', 'پروفایل یوزر', '2022-12-19 06:01:32', '2022-12-19 06:01:32'),
(104, 1, 'User log activity', 'تمام کارکرد های استفاده کننده در سیستم', '2022-12-19 06:02:12', '2022-12-19 06:02:12'),
(105, 1, 'User login activity', 'لیست ورودی های استفاده کننده در سیستم', '2022-12-19 06:03:16', '2022-12-19 06:03:16'),
(106, 1, 'Effected module', 'بخش تغیر یافته', '2022-12-19 06:04:42', '2022-12-19 06:04:42'),
(107, 1, 'Effected model', 'مودل تغیر یافته', '2022-12-19 06:05:04', '2022-12-19 06:05:04'),
(108, 1, 'Event', 'رویداد', '2022-12-19 06:05:34', '2022-12-19 06:05:34'),
(109, 1, 'Performed on', 'تاریخ انجام شده', '2022-12-19 06:06:00', '2022-12-19 06:06:00'),
(110, 1, 'User activity log', 'تمام کارکرد های استفاده کننده در سیستم', '2022-12-19 06:08:00', '2022-12-19 06:08:00'),
(111, 1, 'deleted', 'حذف شده', '2022-12-19 06:10:48', '2022-12-19 06:10:48'),
(112, 1, 'updated', 'تجدید گریده', '2022-12-19 06:11:16', '2022-12-19 06:11:16'),
(113, 1, 'created', 'ایجاد شده', '2022-12-19 06:12:12', '2022-12-19 06:12:12'),
(114, 1, 'Log details', 'جزیات', '2022-12-19 06:12:59', '2022-12-19 06:12:59'),
(115, 1, 'Activity details', 'جزیات فعالیت', '2022-12-19 06:13:35', '2022-12-19 06:13:35'),
(116, 1, 'Action type', 'نوع عمل', '2022-12-19 06:13:56', '2022-12-19 06:13:56'),
(117, 1, 'Effected on', 'بخش تغیر یافته', '2022-12-19 06:14:23', '2022-12-19 06:14:23'),
(118, 1, 'Date', 'تاریخ', '2022-12-19 06:14:34', '2022-12-19 06:14:34'),
(119, 1, 'Field name', 'اسم بخش', '2022-12-19 06:17:00', '2022-12-19 06:17:00'),
(120, 1, 'Field value', 'دیتای بخش', '2022-12-19 06:17:39', '2022-12-19 06:17:39'),
(121, 1, 'updated at', 'تجدید گردیده در', '2022-12-19 06:19:19', '2022-12-19 06:19:19'),
(122, 1, 'abbr', 'تخفف', '2022-12-19 06:19:37', '2022-12-19 06:19:37'),
(123, 1, 'IP address', 'آدرس آی پی', '2022-12-19 06:21:02', '2022-12-19 06:21:02'),
(124, 1, 'WAS LOGIN SUCCEED', 'ورود با موفقیت انجام شد', '2022-12-19 06:21:22', '2022-12-19 06:21:22'),
(125, 1, 'Logged in date', 'تاریخ ورود به سیستم', '2022-12-19 06:22:14', '2022-12-19 06:22:14'),
(126, 1, 'Backups', 'پشتیبان گیری', '2022-12-20 10:22:35', '2022-12-20 10:22:35'),
(127, 1, 'All available backups', 'تمام نسخه های پشتیبان موجود', '2022-12-20 10:22:57', '2022-12-20 10:22:57'),
(128, 1, 'Login log', 'راپور ورود به سیستم', '2022-12-20 10:23:46', '2022-12-20 10:23:46'),
(129, 1, 'User login log', 'راپور ورودی ها کاربران در سیستم', '2022-12-20 10:24:27', '2022-12-20 10:24:27'),
(130, 1, 'Truncate', 'حذف همه', '2022-12-20 10:24:45', '2022-12-20 10:24:45'),
(131, 6, 'User management', 'ده استفاده کونکی مدریت', '2022-12-21 12:47:39', '2022-12-21 12:47:39'),
(132, 6, 'Configuration', 'تنظیمات', '2022-12-21 12:47:56', '2022-12-21 12:48:17'),
(133, 1, 'Download PDF', 'دانلود PDF', '2022-12-24 13:01:06', '2022-12-24 13:01:06'),
(134, 1, 'Download Excel', 'دانلود Excel', '2022-12-24 13:01:23', '2022-12-24 13:01:23'),
(135, 1, 'Columns visibility', 'نمایان بودن ستون ها', '2022-12-24 13:02:02', '2022-12-24 13:02:02'),
(136, 1, 'Log activities', 'فعالیت ها', '2022-12-24 13:02:58', '2022-12-24 13:02:58'),
(137, 1, 'Performed date', 'تاریخ اجرا', '2022-12-24 13:03:43', '2022-12-24 13:03:43'),
(138, 1, 'Number', 'شماره', '2022-12-24 14:00:19', '2022-12-24 14:00:19');

-- --------------------------------------------------------

--
-- Table structure for table `login_logs`
--

CREATE TABLE `login_logs` (
  `id` bigint UNSIGNED NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ip_address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `action_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2022_11_30_050041_create_permission_groups_table', 1),
(6, '2022_12_02_181022_create_permissions_table', 1),
(7, '2022_12_06_052144_create_roles_table', 1),
(8, '2022_12_06_052517_create_role_groups_table', 1),
(9, '2022_12_06_105233_create_role_permissions_table', 1),
(10, '2022_12_10_051106_create_user_roles_table', 2),
(11, '2022_12_12_070531_create_languages_table', 3),
(12, '2022_12_13_071728_create_language_dictionaries_table', 4),
(13, '2022_12_18_070817_create_activity_log_table', 5),
(14, '2022_12_18_070818_add_event_column_to_activity_log_table', 5),
(15, '2022_12_18_070819_add_batch_uuid_column_to_activity_log_table', 5),
(16, '2022_12_18_073237_create_login_logs_table', 6),
(17, '2022_12_19_102550_create_system_backup_logs_table', 7),
(18, '2022_12_26_193928_create_public_websites_table', 8),
(19, '2022_12_29_092027_create_widgets_table', 9),
(20, '0000_00_00_000000_create_websockets_statistics_entries_table', 1),
(21, '2024_07_14_212242_create_periods_table', 10),
(22, '2024_07_15_182502_create_treatments_table', 11),
(23, '2024_07_15_183055_create_rooms_table', 12),
(24, '2024_07_15_183515_create_beds_table', 13),
(25, '2024_07_15_190219_create_patients_table', 14),
(26, '2024_07_17_134232_create_test_models_table', 15),
(27, '2024_07_17_134345_create_test_model2s_table', 16),
(28, '2024_07_17_135906_create_incomes_table', 17),
(29, '2024_07_17_143419_create_expenses_table', 18),
(30, '2024_07_17_174904_create_suppliers_table', 19),
(31, '2024_07_18_144017_create_doctor_reports_table', 20),
(32, '2024_07_22_135143_create_patient_attachments_table', 21);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

CREATE TABLE `patients` (
  `id` bigint UNSIGNED NOT NULL,
  `bed_id` int UNSIGNED NOT NULL,
  `id_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `full_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `father_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `grant_father_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dob` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gender` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `age` int NOT NULL,
  `current_address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `permanent_address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `martial_status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `entry_date` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `r_full_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `r_father_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `r_grant_father_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `r_nid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `r_phone_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `relationship` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `r_current_address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `r_permanent_address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `illness_duration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mental_state` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `period_id` int UNSIGNED NOT NULL,
  `per_day_fees` int NOT NULL,
  `total_period_price` int NOT NULL,
  `amount_by_alphabet` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `taken_items` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `take_item_date` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `take_item_person` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `due_amount` double NOT NULL DEFAULT '0',
  `status` tinyint NOT NULL DEFAULT '1',
  `exited` tinyint NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `patient_attachments`
--

CREATE TABLE `patient_attachments` (
  `id` bigint UNSIGNED NOT NULL,
  `patient_id` int UNSIGNED NOT NULL,
  `details` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_size` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `periods`
--

CREATE TABLE `periods` (
  `id` bigint UNSIGNED NOT NULL,
  `id_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint UNSIGNED NOT NULL,
  `permission_group_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `permission_group_id`, `name`, `key`, `created_at`, `updated_at`) VALUES
(1, 1, 'Access', 'user-management-access', '2022-12-11 06:04:55', '2022-12-11 06:04:55'),
(2, 2, 'Access', 'users-access', '2022-12-11 06:05:18', '2022-12-11 06:05:18'),
(3, 2, 'Create user', 'users-create-user', '2022-12-11 06:05:30', '2022-12-11 06:05:30'),
(4, 2, 'Edit user', 'users-edit-user', '2022-12-11 06:05:39', '2022-12-11 06:05:39'),
(5, 2, 'Delete user', 'users-delete-user', '2022-12-11 06:05:48', '2022-12-11 06:05:48'),
(6, 3, 'Access', 'roles-access', '2022-12-11 06:05:55', '2022-12-11 06:05:55'),
(9, 3, 'View role details', 'roles-view-role-details', '2022-12-11 06:06:23', '2022-12-11 06:06:23'),
(10, 3, 'Create role', 'roles-create-role', '2022-12-11 06:06:50', '2022-12-11 06:06:50'),
(11, 3, 'Edit role', 'roles-edit-role', '2022-12-11 06:06:54', '2022-12-11 06:06:54'),
(12, 3, 'Delete role', 'roles-delete-role', '2022-12-11 06:06:58', '2022-12-11 06:06:58'),
(13, 2, 'View profile', 'users-view-profile', '2022-12-11 08:13:11', '2022-12-11 08:13:11'),
(14, 4, 'Access', 'configuration-access', '2022-12-11 10:24:17', '2022-12-11 10:24:17'),
(15, 5, 'Access', 'language-access', '2022-12-11 10:43:21', '2022-12-11 10:43:21'),
(16, 5, 'Create language', 'language-create-language', '2022-12-12 06:22:13', '2022-12-12 06:22:13'),
(17, 5, 'Edit language name', 'language-edit-language-name', '2022-12-13 05:26:42', '2022-12-13 05:26:42'),
(18, 5, 'Delete language', 'language-delete-language', '2022-12-13 05:26:49', '2022-12-13 05:26:49'),
(19, 6, 'Access', 'language-dictionary-access', '2022-12-13 05:27:28', '2022-12-13 05:27:28'),
(21, 6, 'Add new word to dictionary', 'language-dictionary-add-new-word-to-dictionary', '2022-12-13 05:44:26', '2022-12-13 05:44:26'),
(22, 6, 'Edit word', 'language-dictionary-edit-word', '2022-12-13 07:32:33', '2022-12-13 07:32:33'),
(23, 6, 'Delete word', 'language-dictionary-delete-word', '2022-12-13 07:32:39', '2022-12-13 07:32:39'),
(26, 9, 'Access', 'log-activity-access', '2022-12-18 10:06:53', '2022-12-18 10:06:53'),
(27, 2, 'View user login log', 'users-view-user-login-log', '2022-12-18 10:39:43', '2022-12-18 10:39:43'),
(28, 9, 'View log details', 'log-activity-view-log-details', '2022-12-18 11:01:30', '2022-12-18 11:01:30'),
(29, 9, 'Delete log', 'log-activity-delete-log', '2022-12-18 11:01:48', '2022-12-18 11:01:48'),
(30, 10, 'Access', 'login-log-access', '2022-12-19 06:29:09', '2022-12-19 06:29:09'),
(31, 10, 'Truncate', 'login-log-truncate', '2022-12-19 06:29:17', '2022-12-19 06:29:17'),
(32, 11, 'Access', 'backups-access', '2022-12-19 15:37:12', '2022-12-19 15:37:12'),
(33, 13, 'Access', 'log-activity-access', '2022-12-22 10:29:09', '2022-12-22 10:29:09'),
(34, 13, 'View details', 'log-activity-view-details', '2022-12-22 10:29:14', '2022-12-22 10:29:14'),
(35, 14, 'Access', 'public-website-access', '2022-12-26 20:11:00', '2022-12-26 20:11:00'),
(36, 16, 'Access', 'pages-access', '2022-12-27 17:49:27', '2022-12-27 17:49:27'),
(37, 15, 'Access', 'home-page-access', '2022-12-27 17:49:33', '2022-12-27 17:49:33'),
(38, 17, 'Access', 'widgets-access', '2022-12-28 20:05:53', '2022-12-28 20:05:53'),
(39, 17, 'Create widgets', 'widgets-create-widgets', '2022-12-28 20:14:26', '2022-12-28 20:14:26'),
(40, 17, 'Update widgets', 'widgets-update-widgets', '2022-12-29 12:49:46', '2022-12-29 12:49:46'),
(41, 17, 'Delete widgets', 'widgets-delete-widgets', '2022-12-29 12:49:56', '2022-12-29 12:49:56'),
(66, 52, 'Access', 'access', '2023-02-12 01:39:58', '2023-02-12 01:39:58'),
(67, 52, 'Create Contact', 'create-contact', '2023-02-12 01:39:58', '2023-02-12 01:39:58'),
(68, 52, 'Edit Contact', 'edit-contact', '2023-02-12 01:39:58', '2023-02-12 01:39:58'),
(69, 52, 'Delete Contact', 'delete-contact', '2023-02-12 01:39:58', '2023-02-12 01:39:58'),
(71, 54, 'Access', 'access', '2024-07-15 18:02:45', '2024-07-15 18:02:45'),
(72, 54, 'Create Period', 'create-period', '2024-07-15 18:02:45', '2024-07-15 18:02:45'),
(73, 54, 'Edit Period', 'edit-period', '2024-07-15 18:02:45', '2024-07-15 18:02:45'),
(74, 54, 'Delete Period', 'delete-period', '2024-07-15 18:02:45', '2024-07-15 18:02:45'),
(75, 55, 'Access', 'access', '2024-07-15 18:25:50', '2024-07-15 18:25:50'),
(76, 55, 'Create Treatment', 'create-treatment', '2024-07-15 18:25:50', '2024-07-15 18:25:50'),
(77, 55, 'Edit Treatment', 'edit-treatment', '2024-07-15 18:25:50', '2024-07-15 18:25:50'),
(78, 55, 'Delete Treatment', 'delete-treatment', '2024-07-15 18:25:50', '2024-07-15 18:25:50'),
(79, 56, 'Access', 'access', '2024-07-15 18:31:40', '2024-07-15 18:31:40'),
(80, 56, 'Create Room', 'create-room', '2024-07-15 18:31:40', '2024-07-15 18:31:40'),
(81, 56, 'Edit Room', 'edit-room', '2024-07-15 18:31:40', '2024-07-15 18:31:40'),
(82, 56, 'Delete Room', 'delete-room', '2024-07-15 18:31:40', '2024-07-15 18:31:40'),
(83, 57, 'Access', 'access', '2024-07-15 18:42:09', '2024-07-15 18:42:09'),
(84, 57, 'Create Bed', 'create-bed', '2024-07-15 18:42:09', '2024-07-15 18:42:09'),
(85, 57, 'Edit Bed', 'edit-bed', '2024-07-15 18:42:10', '2024-07-15 18:42:10'),
(86, 57, 'Delete Bed', 'delete-bed', '2024-07-15 18:42:10', '2024-07-15 18:42:10'),
(87, 58, 'Access', 'access', '2024-07-17 13:43:13', '2024-07-17 13:43:13'),
(88, 58, 'Create TestModel', 'create-testmodel', '2024-07-17 13:43:13', '2024-07-17 13:43:13'),
(89, 58, 'Edit TestModel', 'edit-testmodel', '2024-07-17 13:43:13', '2024-07-17 13:43:13'),
(90, 58, 'Delete TestModel', 'delete-testmodel', '2024-07-17 13:43:13', '2024-07-17 13:43:13'),
(95, 60, 'Access', 'access', '2024-07-17 17:55:01', '2024-07-17 17:55:01'),
(96, 60, 'Create Supplier', 'create-supplier', '2024-07-17 17:55:01', '2024-07-17 17:55:01'),
(97, 60, 'Edit Supplier', 'edit-supplier', '2024-07-17 17:55:01', '2024-07-17 17:55:01'),
(98, 60, 'Delete Supplier', 'delete-supplier', '2024-07-17 17:55:01', '2024-07-17 17:55:01'),
(99, 61, 'Access', 'access', '2024-07-18 14:44:53', '2024-07-18 14:44:53'),
(100, 61, 'Create DoctorReport', 'create-doctorreport', '2024-07-18 14:44:53', '2024-07-18 14:44:53'),
(101, 61, 'Edit DoctorReport', 'edit-doctorreport', '2024-07-18 14:44:53', '2024-07-18 14:44:53'),
(102, 61, 'Delete DoctorReport', 'delete-doctorreport', '2024-07-18 14:44:53', '2024-07-18 14:44:53');

-- --------------------------------------------------------

--
-- Table structure for table `permission_groups`
--

CREATE TABLE `permission_groups` (
  `id` bigint UNSIGNED NOT NULL,
  `permission_group_id` bigint UNSIGNED NOT NULL DEFAULT '0',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sort` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permission_groups`
--

INSERT INTO `permission_groups` (`id`, `permission_group_id`, `name`, `sort`, `created_at`, `updated_at`) VALUES
(1, 0, 'User management', 0, '2022-12-11 06:04:50', '2023-02-12 01:43:47'),
(2, 1, 'Users', 0, '2022-12-11 06:05:03', '2023-02-11 12:28:14'),
(3, 1, 'Roles', 1, '2022-12-11 06:05:11', '2022-12-11 06:05:11'),
(4, 0, 'Configuration', 1, '2022-12-11 10:24:12', '2023-02-12 01:41:11'),
(5, 4, 'Language', 0, '2022-12-11 10:43:17', '2022-12-11 10:43:17'),
(6, 5, 'Language dictionary', 0, '2022-12-13 05:27:22', '2022-12-13 05:27:22'),
(9, 2, 'Log activity', 0, '2022-12-18 10:06:48', '2022-12-18 10:06:48'),
(10, 1, 'Login log', 2, '2022-12-19 06:28:45', '2023-02-11 12:00:47'),
(11, 4, 'Backups', 1, '2022-12-19 15:37:06', '2022-12-19 15:37:06'),
(13, 1, 'Log activity', 3, '2022-12-22 10:29:02', '2023-02-11 12:28:14'),
(14, 4, 'Public website', 2, '2022-12-26 20:10:54', '2022-12-26 20:10:54'),
(15, 14, 'Home page', 0, '2022-12-27 17:49:11', '2022-12-27 17:49:11'),
(16, 14, 'Pages', 1, '2022-12-27 17:49:22', '2022-12-27 17:49:22'),
(17, 14, 'Widgets', 2, '2022-12-28 20:05:48', '2022-12-28 20:05:48'),
(33, 6, 'Test1', 0, '2023-02-11 12:33:57', '2023-02-11 12:33:57'),
(52, 0, 'Contact', 2, '2023-02-12 01:39:58', '2023-02-12 01:43:47'),
(54, 0, 'Period', 3, '2024-07-15 18:02:45', '2024-07-15 18:02:45'),
(55, 0, 'Treatment', 4, '2024-07-15 18:25:50', '2024-07-15 18:25:50'),
(56, 0, 'Room', 5, '2024-07-15 18:31:40', '2024-07-15 18:31:40'),
(57, 0, 'Bed', 6, '2024-07-15 18:42:09', '2024-07-15 18:42:09'),
(58, 0, 'TestModel', 7, '2024-07-17 13:43:13', '2024-07-17 13:43:13'),
(59, 0, 'TestModel2', 8, '2024-07-17 13:44:09', '2024-07-17 13:44:09'),
(60, 0, 'Supplier', 9, '2024-07-17 17:55:01', '2024-07-17 17:55:01'),
(61, 0, 'DoctorReport', 10, '2024-07-18 14:44:53', '2024-07-18 14:44:53');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `public_websites`
--

CREATE TABLE `public_websites` (
  `id` bigint UNSIGNED NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `logo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `company_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_or_slider` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'image',
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `short_description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `long_description` text COLLATE utf8mb4_unicode_ci,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `facebook` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tweeter` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `youtube` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `instagram` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `copy_right` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint UNSIGNED NOT NULL,
  `created_by` bigint UNSIGNED NOT NULL DEFAULT '0',
  `updated_by` bigint UNSIGNED NOT NULL DEFAULT '0',
  `role_group_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `created_by`, `updated_by`, `role_group_id`, `name`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, 'Super admin', '2022-12-11 06:07:09', '2022-12-17 08:26:59');

-- --------------------------------------------------------

--
-- Table structure for table `role_groups`
--

CREATE TABLE `role_groups` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role_groups`
--

INSERT INTO `role_groups` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Admins', '2022-12-11 06:07:05', '2022-12-11 06:07:05');

-- --------------------------------------------------------

--
-- Table structure for table `role_permissions`
--

CREATE TABLE `role_permissions` (
  `id` bigint UNSIGNED NOT NULL,
  `role_id` bigint UNSIGNED NOT NULL,
  `permission_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role_permissions`
--

INSERT INTO `role_permissions` (`id`, `role_id`, `permission_id`, `created_at`, `updated_at`) VALUES
(1249, 1, 4, '2024-07-17 15:46:17', '2024-07-17 15:46:17'),
(1250, 1, 5, '2024-07-17 15:46:17', '2024-07-17 15:46:17'),
(1251, 1, 3, '2024-07-17 15:46:17', '2024-07-17 15:46:17'),
(1252, 1, 2, '2024-07-17 15:46:17', '2024-07-17 15:46:17'),
(1253, 1, 6, '2024-07-17 15:46:17', '2024-07-17 15:46:17'),
(1254, 1, 9, '2024-07-17 15:46:17', '2024-07-17 15:46:17'),
(1255, 1, 11, '2024-07-17 15:46:17', '2024-07-17 15:46:17'),
(1256, 1, 10, '2024-07-17 15:46:17', '2024-07-17 15:46:17'),
(1257, 1, 12, '2024-07-17 15:46:17', '2024-07-17 15:46:17'),
(1258, 1, 15, '2024-07-17 15:46:17', '2024-07-17 15:46:17'),
(1259, 1, 16, '2024-07-17 15:46:17', '2024-07-17 15:46:17'),
(1260, 1, 17, '2024-07-17 15:46:17', '2024-07-17 15:46:17'),
(1261, 1, 18, '2024-07-17 15:46:17', '2024-07-17 15:46:17'),
(1262, 1, 19, '2024-07-17 15:46:17', '2024-07-17 15:46:17'),
(1263, 1, 21, '2024-07-17 15:46:17', '2024-07-17 15:46:17'),
(1264, 1, 22, '2024-07-17 15:46:17', '2024-07-17 15:46:17'),
(1265, 1, 23, '2024-07-17 15:46:17', '2024-07-17 15:46:17'),
(1266, 1, 14, '2024-07-17 15:46:17', '2024-07-17 15:46:17'),
(1267, 1, 26, '2024-07-17 15:46:17', '2024-07-17 15:46:17'),
(1268, 1, 27, '2024-07-17 15:46:17', '2024-07-17 15:46:17'),
(1269, 1, 28, '2024-07-17 15:46:17', '2024-07-17 15:46:17'),
(1270, 1, 29, '2024-07-17 15:46:17', '2024-07-17 15:46:17'),
(1271, 1, 30, '2024-07-17 15:46:17', '2024-07-17 15:46:17'),
(1272, 1, 32, '2024-07-17 15:46:17', '2024-07-17 15:46:17'),
(1273, 1, 1, '2024-07-17 15:46:17', '2024-07-17 15:46:17'),
(1274, 1, 13, '2024-07-17 15:46:17', '2024-07-17 15:46:17'),
(1275, 1, 33, '2024-07-17 15:46:17', '2024-07-17 15:46:17'),
(1276, 1, 34, '2024-07-17 15:46:17', '2024-07-17 15:46:17'),
(1277, 1, 35, '2024-07-17 15:46:17', '2024-07-17 15:46:17'),
(1278, 1, 37, '2024-07-17 15:46:17', '2024-07-17 15:46:17'),
(1279, 1, 36, '2024-07-17 15:46:17', '2024-07-17 15:46:17'),
(1280, 1, 38, '2024-07-17 15:46:17', '2024-07-17 15:46:17'),
(1281, 1, 39, '2024-07-17 15:46:17', '2024-07-17 15:46:17'),
(1282, 1, 40, '2024-07-17 15:46:17', '2024-07-17 15:46:17'),
(1283, 1, 41, '2024-07-17 15:46:17', '2024-07-17 15:46:17'),
(1284, 1, 83, '2024-07-17 15:46:17', '2024-07-17 15:46:17'),
(1285, 1, 84, '2024-07-17 15:46:17', '2024-07-17 15:46:17'),
(1286, 1, 85, '2024-07-17 15:46:17', '2024-07-17 15:46:17'),
(1287, 1, 86, '2024-07-17 15:46:17', '2024-07-17 15:46:17'),
(1288, 1, 79, '2024-07-17 15:46:17', '2024-07-17 15:46:17'),
(1289, 1, 80, '2024-07-17 15:46:17', '2024-07-17 15:46:17'),
(1290, 1, 81, '2024-07-17 15:46:17', '2024-07-17 15:46:17'),
(1291, 1, 82, '2024-07-17 15:46:17', '2024-07-17 15:46:17'),
(1292, 1, 75, '2024-07-17 15:46:17', '2024-07-17 15:46:17'),
(1293, 1, 76, '2024-07-17 15:46:17', '2024-07-17 15:46:17'),
(1294, 1, 77, '2024-07-17 15:46:17', '2024-07-17 15:46:17'),
(1295, 1, 78, '2024-07-17 15:46:17', '2024-07-17 15:46:17'),
(1296, 1, 71, '2024-07-17 15:46:17', '2024-07-17 15:46:17'),
(1297, 1, 72, '2024-07-17 15:46:17', '2024-07-17 15:46:17'),
(1298, 1, 73, '2024-07-17 15:46:17', '2024-07-17 15:46:17'),
(1299, 1, 74, '2024-07-17 15:46:17', '2024-07-17 15:46:17'),
(1300, 1, 66, '2024-07-17 15:46:17', '2024-07-17 15:46:17'),
(1301, 1, 67, '2024-07-17 15:46:17', '2024-07-17 15:46:17'),
(1302, 1, 68, '2024-07-17 15:46:17', '2024-07-17 15:46:17'),
(1303, 1, 69, '2024-07-17 15:46:17', '2024-07-17 15:46:17');

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `id` bigint UNSIGNED NOT NULL,
  `id_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

CREATE TABLE `suppliers` (
  `id` bigint UNSIGNED NOT NULL,
  `supplier_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `details` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `responsible` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_amount` double NOT NULL,
  `due_amount` double NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `test_model2s`
--

CREATE TABLE `test_model2s` (
  `id` bigint UNSIGNED NOT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `test_models`
--

CREATE TABLE `test_models` (
  `id` bigint UNSIGNED NOT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `treatments`
--

CREATE TABLE `treatments` (
  `id` bigint UNSIGNED NOT NULL,
  `id_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `change_password` tinyint(1) NOT NULL DEFAULT '0',
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_doctor` tinyint NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `last_name`, `email`, `phone_number`, `email_verified_at`, `password`, `status`, `change_password`, `image`, `remember_token`, `is_doctor`, `created_at`, `updated_at`) VALUES
(1, 'Ahmad Edris', 'Malia', 'edris.malya@dab.gov.af', '+93781357171', NULL, '$2y$10$02./WWYTrZqRK8dTrlEts.gaPFdq5UcNMJ8.qtWB4pNBHu4lzas6u', 1, 0, 'users_picture/RMcNrJNazPLc6Cs2FUeTDwdBivTVYI3XnEaS5VI0.jpg', NULL, 0, '2022-12-13 10:37:32', '2022-12-13 10:47:15'),
(11, 'امیر حسام', 'بارکزی', 'hasam@hayatpack.com', '0799999999', NULL, '$2y$10$0smlV3nIsfgWu6Zush9rYObDXwViSReGJRQZ7tqOpCaF2MO0C962.', 1, 0, 'user.png', NULL, 0, '2024-07-18 14:30:21', '2024-07-18 15:38:34'),
(12, 'میرآقا', 'میرزاده', 'miraqa@hayatpack.com', '0799999923', NULL, '$2y$10$O7w25oQLP5kI3c8e7QjgYObhmFCMlS1/vXs3ubWgFpSzMy90dWvfO', 1, 0, 'user.png', NULL, 0, '2024-07-18 14:35:04', '2024-07-18 14:35:32');

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE `user_roles` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `role_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`id`, `user_id`, `role_id`, `created_at`, `updated_at`) VALUES
(1, 2, 1, '2022-12-11 06:08:37', '2022-12-11 06:08:37'),
(23, 12, 1, '2024-07-18 14:35:04', '2024-07-18 14:35:04'),
(26, 11, 1, '2024-07-18 15:38:34', '2024-07-18 15:38:34');

-- --------------------------------------------------------

--
-- Table structure for table `websockets_statistics_entries`
--

CREATE TABLE `websockets_statistics_entries` (
  `id` int UNSIGNED NOT NULL,
  `app_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `peak_connection_count` int NOT NULL,
  `websocket_message_count` int NOT NULL,
  `api_message_count` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `widgets`
--

CREATE TABLE `widgets` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity_log`
--
ALTER TABLE `activity_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `subject` (`subject_type`,`subject_id`),
  ADD KEY `causer` (`causer_type`,`causer_id`),
  ADD KEY `activity_log_log_name_index` (`log_name`);

--
-- Indexes for table `beds`
--
ALTER TABLE `beds`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `doctor_reports`
--
ALTER TABLE `doctor_reports`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `expenses`
--
ALTER TABLE `expenses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `incomes`
--
ALTER TABLE `incomes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `languages`
--
ALTER TABLE `languages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `language_dictionaries`
--
ALTER TABLE `language_dictionaries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `login_logs`
--
ALTER TABLE `login_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `login_logs_email_index` (`email`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `patient_attachments`
--
ALTER TABLE `patient_attachments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `periods`
--
ALTER TABLE `periods`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `permission_groups`
--
ALTER TABLE `permission_groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `public_websites`
--
ALTER TABLE `public_websites`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `role_groups`
--
ALTER TABLE `role_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `role_groups_name_unique` (`name`);

--
-- Indexes for table `role_permissions`
--
ALTER TABLE `role_permissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `test_model2s`
--
ALTER TABLE `test_model2s`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `test_models`
--
ALTER TABLE `test_models`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `treatments`
--
ALTER TABLE `treatments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `websockets_statistics_entries`
--
ALTER TABLE `websockets_statistics_entries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `widgets`
--
ALTER TABLE `widgets`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `widgets_name_unique` (`name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity_log`
--
ALTER TABLE `activity_log`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `beds`
--
ALTER TABLE `beds`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `doctor_reports`
--
ALTER TABLE `doctor_reports`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `expenses`
--
ALTER TABLE `expenses`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `incomes`
--
ALTER TABLE `incomes`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `languages`
--
ALTER TABLE `languages`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `language_dictionaries`
--
ALTER TABLE `language_dictionaries`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=139;

--
-- AUTO_INCREMENT for table `login_logs`
--
ALTER TABLE `login_logs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `patients`
--
ALTER TABLE `patients`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `patient_attachments`
--
ALTER TABLE `patient_attachments`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `periods`
--
ALTER TABLE `periods`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;

--
-- AUTO_INCREMENT for table `permission_groups`
--
ALTER TABLE `permission_groups`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `public_websites`
--
ALTER TABLE `public_websites`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `role_groups`
--
ALTER TABLE `role_groups`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `role_permissions`
--
ALTER TABLE `role_permissions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1304;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `test_model2s`
--
ALTER TABLE `test_model2s`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `test_models`
--
ALTER TABLE `test_models`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `treatments`
--
ALTER TABLE `treatments`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `user_roles`
--
ALTER TABLE `user_roles`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `websockets_statistics_entries`
--
ALTER TABLE `websockets_statistics_entries`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `widgets`
--
ALTER TABLE `widgets`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
