export const formattedContent = (content: string | null) => {
    const hashtagRegex = /#\w+/g;
    const mentionRegex = /@\w+/g;
    const hasHashtagsOrMentions = content && (hashtagRegex.test(content) || mentionRegex.test(content));
    if (!hasHashtagsOrMentions) {
        return <p className="">{content}</p>;
    }
    const formatContent =
        content &&
        content
            .replace(hashtagRegex, match => `<span class="text-emerald-400">${match}</span>`)
            .replace(mentionRegex, match => `<span class="text-emerald-400">${match}</span>`);

    return <div dangerouslySetInnerHTML={{ __html: formatContent }} />;
};
