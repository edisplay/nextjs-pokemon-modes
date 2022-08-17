// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// Forced revalidation:
export default async function handler(req, res) {
    for (const url of req.body) {
        // get list of URLs to revalidate
        await res.unstable_revalidate(url);
    }
    res.status(200).json({ revalidate: true });
}
