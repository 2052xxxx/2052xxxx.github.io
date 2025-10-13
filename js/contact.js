$(document).ready(() => {
    $("form#contactForm").on('submit', (event) => {
        event.preventDefault();

        const subject = $("input#subject").val();
        const body = $("textarea#body").val();

        const encodedSubject = encodeURIComponent(subject);
        const encodedBody = encodeURIComponent(body);

        const mailtoUrl = "mailto:minhtrang.nmt02@gmail.com?subject=" + encodedSubject + "&body=" + encodedBody;

        window.location.href = mailtoUrl;
    })

    // $("span.email-copy").on('click', async () => {
    //     const text = $.trim($("span.email-copy").text());

    //     try {
    //         await navigator.clipboard.writeText(text);
    //         console.log('Content copied to clipboard');
    //     } catch (err) {
    //         console.error('Failed to copy: ', err);
    //     }
    // })
})