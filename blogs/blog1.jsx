import BlogMarkdown from "../src/components/BlogMarkdown.jsx";

export const metadata = {
  "title": "A Little Reminiscing",
  "slug": "a-little-reminiscing",
  "excerpt": "Just a story about me in High School I guess.",
  "date": "2026-11-27",
  "readTime": 5,
  "tags": [
    "High School",
    "Ameer",
    "Head Prefect",
    "Head Boy",
    "Responsibilities",
    "Leadership"
  ],
  "coverImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy4L7q2Ysk-4Zme-REC_Bhx-Cask6hUbrsTaK95O6byA&s=10"
};

const content = "# What Being Head Prefect Taught Me\n\nWhen I look back at high school (2020–2023), I’m always in awe of how much it helped me grow. I was always the best in class (though we were a mere class of 15), even back in middle school, so I was chosen as **Head Prefect** in my first year of high school. It was an unusual choice, and I was the only prefect from my class.\n\nIf you don’t know what prefects are, they’re basically high school students who help run the school alongside the teachers. I was 13 at the time, and while I loved being a prefect, the responsibilities that came with it were not to be underestimated.\n\nI already had a few responsibilities in middle school, teaching juniors and organizing religious gatherings, but they were nothing compared to being Head Prefect. I was responsible for organizing excursions, clubs, workshops, and sports outings, overseeing health coordination within the school, and more. I had sub-prefects handling many of these areas (the health prefect, food prefect, clubs prefect, and so on), but I was the overall overseer and the teachers’ main point of contact.\n\nSince my sub-prefects were all seniors, I had to grow up a little faster. They were really nice and willing to work with me, though, even if I was younger than them. I learned how to communicate with both my peers and people much older than me, present my ideas, coordinate a team, or several teams, and a lot more.\n\n## Starting an inter-school chess competition\n\nOne experience that really stuck with me was trying to organize an inter-school chess competition for our chess club. I was in my second year by then. We already had inter-school sports, literature and debate, academic, and religious competitions. The chess club was one of the only clubs without an inter-school competition. A lot of Nigerian schools don’t take chess seriously or have a regular chess routine. But the students wanted it, I wanted it, so I was going to make it happen.\n\nI started by talking to students from the other schools around us. Most weren’t interested, again, chess isn’t very popular in Nigeria, but the ones who were interested were determined to make it happen. I got three students from each school (there were five schools at the time) and asked them to help make chess more popular in their schools. We couldn’t have a competition without participants.\n\nThe new players obviously couldn’t compete with us right away; we already had regular practice. To make the competition fair, I organized joint practice sessions, assigned tutors and levels, and got our principal to agree to host the other schools at our facilities. We also helped each school set up its own club routine and training curriculum.\n\n## Finding a reason to show up\n\nWhen it was finally time for the competition, something was still missing: an incentive. Why should people participate? What would make them show up? Many were happy just to come and have fun. I wanted there to be more to it than that. *Where’s the fun in that?*\n\nSo I took my first real step toward finding a sponsor. I reached out to college and university students, since they were the people just above us in the academic hierarchy. I didn’t just reach out to any students, though. I tried that at first and didn’t get much traction. Instead, I targeted students in chess communities, both within and outside their universities. Thankfully, my mum works in the university space, so it was easier for me to connect with them.\n\nThanks to my efforts and those of my representatives from the various schools, I raised **NGN 70,000**. For a high school student, that was about the best-case scenario. Finally, in my third year of high school, just before final exams and graduation, we held a small but extremely fulfilling first chess competition.\n\nOne thing that always makes me proud is that my juniors followed in my footsteps and didn’t let it die out. Just last month, the fourth edition of what is now called the **“Abdul’s Inter-School Chess Competition”** was held. My school has gone on to participate in much bigger competitions since then, but it’s an honour that they didn’t let the one I started disappear.\n\n## More than a title\n\nThat’s just one of the many things being Head Prefect taught me, and one of many experiences I had as a young boy learning to navigate responsibility. After graduation, I took on volunteer teaching roles while I waited for university admission. I also helped organize Junuud Maukhayyam’s religious boot camps every December from 2021 onward, and I’ve worked at two internships. I’ll write about those adventures in another post.\n\nBeing Head Prefect pushed me to grow up a little faster, but it also showed me what can happen when you take an idea seriously and bring other people along. The chess competition is still going, and seeing my juniors carry it forward is one of the things I’m proudest of.";

export default function BlogPost() {
  const publishedDate = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(`${metadata.date}T12:00:00`));

  return (
    <article className="mx-auto max-w-3xl pb-8">
      {metadata.coverImage ? (
        <img
          src={metadata.coverImage}
          alt=""
          className="mb-10 max-h-[460px] w-full border border-neutral-800 object-cover"
        />
      ) : null}
      <header className="mb-9 border-b border-neutral-800 pb-8">
        <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-bold uppercase tracking-[0.16em] text-neutral-500">
          <time dateTime={metadata.date}>{publishedDate}</time>
          <span aria-hidden="true">·</span>
          <span>{metadata.readTime} min read</span>
        </div>
        <h1 className="mb-5 text-3xl font-bold leading-tight text-white md:text-5xl">{metadata.title}</h1>
        <p className="max-w-2xl text-base leading-relaxed text-neutral-400 md:text-lg">{metadata.excerpt}</p>
        {metadata.tags.length ? (
          <div className="mt-6 flex flex-wrap gap-2">
            {metadata.tags.map((tag) => (
              <span key={tag} className="border border-neutral-700 bg-neutral-900 px-2.5 py-1 text-xs font-semibold text-neutral-300">
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </header>
      <BlogMarkdown content={content} />
    </article>
  );
}
