document.addEventListener("DOMContentLoaded", () => {

    // COPY TO CLIPBOARD HANDLER
    document.querySelectorAll('[data-copy]').forEach(el => {
        el.addEventListener('click', () => {
            const text = el.getAttribute('data-copy');

            // Modern clipboard API (https / localhost)
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(text).then(() => {
                    showToast(text + " copied");
                }).catch(() => {
                    fallbackCopy(text);
                });
            } else {
                fallbackCopy(text);
            }
        });
    });

    // OPEN LINKS (LinkedIn)
    document.querySelectorAll('[data-link]').forEach(el => {
        el.addEventListener('click', () => {
            const url = el.getAttribute('data-link');
            window.open(url, '_blank');
        });
    });

    // Fallback copy method
    function fallbackCopy(text) {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        showToast(text + " copied");
    }

    // Toast popup
    function showToast(msg) {
        const toast = document.createElement("div");
        toast.innerText = msg;

        toast.style.position = "fixed";
        toast.style.bottom = "10vh";
        toast.style.left = "50%";
        toast.style.transform = "translateX(-50%)";
        toast.style.background = "rgba(0,0,0,0.85)";
        toast.style.color = "#fff";
        toast.style.padding = "8px 16px";
        toast.style.borderRadius = "20px";
        toast.style.fontSize = "12px";
        toast.style.zIndex = "99999";
        toast.style.fontFamily = "Lexend";
        toast.style.boxShadow = "0 0 10px rgba(0,255,255,0.5)";

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = "0";
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }

});
