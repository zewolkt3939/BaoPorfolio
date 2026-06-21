// =====================================================
// 📝 DỮ LIỆU PORTFOLIO — SỬA TẠI ĐÂY / EDIT YOUR DATA HERE
// Có thể chỉnh sửa qua trang admin (public/admin.html)
// =====================================================

// ----- Chứng chỉ / Certifications -----
const CERTIFICATES = [
  {
    icon: '🎓',
    name: 'Google Cybersecurity Professional Certificate',
    issuer: 'Google / Coursera',
    status: { vi: 'Hoàn thành', en: 'Completed' },
    date: '2025-11',
    link: 'https://www.coursera.org/professional-certificates/google-cybersecurity'
  },
  {
    icon: '🌐',
    name: 'Cisco CCNA Training',
    issuer: 'Cisco',
    status: { vi: 'Đang học · 70%', en: 'In progress · 70%' },
    date: '2026-06',
    link: 'https://www.netacad.com/courses/networking/ccna'
  },
  {
    icon: '🕸️',
    name: 'Web Security Academy',
    issuer: 'PortSwigger',
    status: { vi: 'Đang học · 80%', en: 'In progress · 80%' },
    date: '2026-06',
    link: 'https://portswigger.net/web-security'
  },
  {
    icon: '📦',
    name: 'CJCA Path',
    issuer: 'Hack The Box',
    status: { vi: 'Đang học · 60%', en: 'In progress · 60%' },
    date: '2026-06',
    link: 'https://academy.hackthebox.com/path/preview/certified-junior-cybersecurity-associate'
  }
];

// ----- Kỹ năng / Skills (danh sách chip theo nhóm) -----
const SKILLS = [
  {
    group: { vi: '🛡️ Bảo mật', en: '🛡️ Security' },
    items: ['Wazuh SIEM', 'Suricata IDS/IPS', 'Burp Suite', 'Wireshark', 'Nmap', 'Kali Linux']
  },
  {
    group: { vi: '🌐 Mạng', en: '🌐 Networking' },
    items: ['Routing & Switching', 'VLAN', 'Inter-VLAN Routing', 'OSPF', 'ACL', 'NAT/PAT', 'Network Fundamentals']
  },
  {
    group: { vi: '💻 Lập trình', en: '💻 Programming' },
    items: ['Python', 'Bash Scripting', 'FastAPI']
  },
  {
    group: { vi: '🔍 Code Review', en: '🔍 Code Review' },
    items: ['PHP', 'HTML', 'JavaScript', 'Java']
  }
];

// ----- Dự án / Projects -----
const PROJECTS = [
  {
    title: {
      vi: 'AI-Powered Alert Prioritization for Wazuh',
      en: 'AI-Powered Alert Prioritization for Wazuh'
    },
    desc: {
      vi: 'Thiết kế và triển khai môi trường bảo mật doanh nghiệp mô phỏng gồm các phân vùng WAN, LAN và DMZ sử dụng pfSense Firewall, Wazuh SIEM, Suricata IDS/IPS, Ubuntu Server và Kali Linux.',
      en: 'Designed and deployed a simulated enterprise security environment consisting of WAN, LAN, and DMZ segments using pfSense Firewall, Wazuh SIEM, Suricata IDS/IPS, Ubuntu Server, and Kali Linux.'
    },
    context: {
      vi: 'Bối cảnh: Lab sinh viên cần ưu tiên hàng trăm cảnh báo để rút ngắn thời gian phản hồi sự cố.',
      en: 'Context: Student SOC lab needed to prioritize hundreds of alerts and reduce triage time.'
    },
    role: {
      vi: 'Vai trò của mình: Thiết kế pipeline log, viết API xử lý sự kiện, huấn luyện logic ưu tiên cảnh báo.',
      en: 'My role: Designed log pipeline, implemented event-processing APIs, and built alert-priority logic.'
    },
    points: [
      {
        vi: 'Xây dựng dịch vụ Python FastAPI để thu thập, chuẩn hóa và xử lý sự kiện bảo mật từ Wazuh Indexer',
        en: 'Developed Python FastAPI services to collect, normalize, and process security events from Wazuh Indexer'
      },
      {
        vi: 'Xây dựng hệ thống ưu tiên cảnh báo hỗ trợ AI, phân loại các sự kiện như SQL Injection, XSS, Brute Force, LFI và DoS',
        en: 'Built an AI-assisted alert prioritization system classifying security events such as SQL Injection, XSS, Brute Force, LFI, and DoS attacks'
      },
      {
        vi: 'Triển khai logic tương quan sự kiện (event correlation) để phát hiện các mẫu tấn công đa giai đoạn',
        en: 'Implemented event correlation logic to identify multi-stage attack patterns and improve threat visibility'
      },
      {
        vi: 'Tích hợp cảnh báo qua Telegram để nhận biết sự cố theo thời gian thực',
        en: 'Integrated Telegram-based alert notifications for real-time incident awareness'
      }
    ],
    outcome: {
      vi: 'Kết quả: Tạo dashboard ưu tiên cảnh báo giúp lọc nhiễu và tăng tốc điều tra sự cố theo mức độ rủi ro.',
      en: 'Outcome: Delivered a prioritization dashboard that reduced noise and accelerated risk-based incident triage.'
    },
    tags: ['Wazuh', 'Suricata', 'pfSense', 'FastAPI', 'Python', 'AI', 'Telegram'],
    image: 'assets/project-wazuh.svg',
    links: [
      { label: { vi: 'Write-up', en: 'Write-up' }, url: 'blog/sql-injection-basics.html' },
      { label: { vi: 'Nguồn dự án', en: 'Project source' }, url: 'https://gitlab.com/bigzero3939-group' }
    ]
  },
  {
    title: {
      vi: 'SOC Detection Rules for Web Attacks',
      en: 'SOC Detection Rules for Web Attacks'
    },
    desc: {
      vi: 'Xây dựng bộ quy tắc phát hiện SQLi/XSS/Brute Force cho môi trường web nội bộ và tích hợp cảnh báo tập trung.',
      en: 'Built SQLi/XSS/Brute-force detection rules for an internal web environment with centralized alerting.'
    },
    context: {
      vi: 'Bối cảnh: Cần giảm false positive khi giám sát truy cập web có lưu lượng thử nghiệm lớn.',
      en: 'Context: Needed to reduce false positives in a high-volume web traffic lab.'
    },
    role: {
      vi: 'Vai trò của mình: Viết rule, tune threshold, đối chiếu log giữa Wazuh và Suricata.',
      en: 'My role: Authored detection rules, tuned thresholds, and correlated Wazuh with Suricata logs.'
    },
    points: [
      {
        vi: 'Thiết kế use case dựa trên MITRE ATT&CK cho nhóm tấn công ứng dụng web',
        en: 'Designed MITRE ATT&CK-aligned use cases for web attack techniques'
      },
      {
        vi: 'Tinh chỉnh detection threshold theo asset và tần suất truy cập',
        en: 'Tuned detection thresholds by asset profile and request frequency'
      },
      {
        vi: 'Chuẩn hóa mẫu báo cáo điều tra để bàn giao nhanh cho đội vận hành',
        en: 'Standardized investigation report format for faster operational handoff'
      }
    ],
    outcome: {
      vi: 'Kết quả: Cải thiện chất lượng cảnh báo và giảm cảnh báo nhiễu trong quá trình giám sát.',
      en: 'Outcome: Improved alert quality and reduced noisy detections during monitoring.'
    },
    tags: ['Detection Engineering', 'SOC', 'Wazuh', 'Suricata', 'MITRE ATT&CK'],
    image: 'assets/project-wazuh.svg',
    links: [
      { label: { vi: 'Blog liên quan', en: 'Related blog' }, url: 'blog/sql-injection-basics.html' },
      { label: { vi: 'LinkedIn', en: 'LinkedIn' }, url: 'https://www.linkedin.com/in/nguyen-truong-bao-347437250' }
    ]
  }
];

// ----- Blog -----
const BLOG_POSTS = [
  {
    title: { vi: 'SQL Injection cơ bản cho người mới', en: 'SQL Injection Basics for Beginners' },
    date: '2026-05-20',
    tags: ['Web Security', 'SQLi'],
    excerpt: {
      vi: 'Tìm hiểu cách hoạt động của SQL Injection, ví dụ thực tế và cách phòng chống.',
      en: 'Understand how SQL Injection works, with practical examples and prevention techniques.'
    },
    url: 'blog/sql-injection-basics.html'
  },
  {
    title: { vi: 'Roadmap tự học Cybersecurity 2026', en: 'Self-taught Cybersecurity Roadmap 2026' },
    date: '2026-04-02',
    tags: ['Career', 'Learning'],
    excerpt: {
      vi: 'Lộ trình học bảo mật từ con số 0: nền tảng mạng, Linux, lab thực hành và chứng chỉ.',
      en: 'A from-zero security learning path: networking fundamentals, Linux, hands-on labs and certs.'
    },
    url: '#'
  }
];
