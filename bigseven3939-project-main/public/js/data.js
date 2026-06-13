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
    date: 'Completed',
    link: '#'
  },
  {
    icon: '🌐',
    name: 'Cisco CCNA Training',
    issuer: 'Cisco',
    date: 'In progress · 70%',
    link: '#'
  },
  {
    icon: '🕸️',
    name: 'Web Security Academy',
    issuer: 'PortSwigger',
    date: 'In progress · 80%',
    link: '#'
  },
  {
    icon: '📦',
    name: 'CJCA Path',
    issuer: 'Hack The Box',
    date: 'In progress · 60%',
    link: '#'
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
    tags: ['Wazuh', 'Suricata', 'pfSense', 'FastAPI', 'Python', 'AI', 'Telegram'],
    link: '#'
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
