// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  // res.unstable_revalidate('/pokemon/1'); // sample
  res.status(200).json({ name: 'John Doe' })
}
