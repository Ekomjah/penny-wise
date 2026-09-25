import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import BriefLesson from '../components/BriefLesson';
import { modules } from '../data/modules';
import { useCourseCatalog } from '../lib/useCourseCatalog';

const PRACTICE_LABELS = {
  multiple_choice: 'Quick choice',
  matching: 'Match the pairs',
  budgeting: 'Money lab',
  wants_needs: 'Sort it out',
};

const normalize = (value) =>
  String(value ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const CoursePage = () => {
  const { moduleId, courseId } = useParams();
  const { courses, isLoading } = useCourseCatalog();
  const [activePath, setActivePath] = useState(null);

  const selectedModule = modules.find(
    (module) => module.id === Number(moduleId),
  );
  const selectedCourse = selectedModule?.lessons.find(
    (lesson) => lesson.id === Number(courseId),
  );

  const remoteCourse = courses.find(
    (course) => normalize(course.name) === normalize(selectedModule?.name),
  );
  const remoteLesson = remoteCourse?.lessons.find(
    (lesson) => normalize(lesson.name) === normalize(selectedCourse?.title),
  );

  const displayedCourse = remoteLesson || selectedCourse;
  const briefLesson =
    displayedCourse?.briefLesson || selectedModule?.briefLesson;
  const duration =
    remoteLesson?.estimatedDurationOfCompletionInMinutes ||
    selectedCourse?.duration;

  const practiceItems = useMemo(() => {
    if (remoteLesson?.pages?.length) {
      return remoteLesson.pages.map((page, index) => ({
        ...page,
        key: page._id || `page-${index}`,
        label: PRACTICE_LABELS[page.type] || 'Interactive path',
      }));
    }

    return selectedModule?.lessons.map((lesson) => ({
      key: `path-${lesson.id}`,
      label: 'Interactive path',
      title: lesson.title,
      text: lesson.description,
    }));
  }, [remoteLesson, selectedModule]);

  const pathContext = `${moduleId}/${courseId}`;
  const activeItem = practiceItems.find(
    (item) =>
      activePath?.context === pathContext && item.key === activePath.key,
  );
  const lessonIndex = selectedModule?.lessons.findIndex(
    (lesson) => lesson.id === Number(courseId),
  );
  const previousLesson = selectedModule?.lessons[lessonIndex - 1];
  const nextLesson = selectedModule?.lessons[lessonIndex + 1];

  if (!selectedModule || !selectedCourse) {
    return (
      <main className='mx-auto w-full max-w-7xl p-4 text-left sm:p-6'>
        <h1 className='text-3xl font-semibold text-[var(--text-h)]'>
          Course not found
        </h1>
        <Link
          to='/modules'
          className='mt-4 inline-block rounded-full border border-[var(--accent-border)] px-4 py-2 text-sm font-semibold text-[var(--accent-bold)] dark:text-[var(--accent)]'
        >
          Back to modules
        </Link>
      </main>
    );
  }

  return (
    <main className='mx-auto w-full max-w-6xl p-4 text-left sm:p-6'>
      <nav aria-label='Breadcrumb' className='mb-6 text-sm text-[var(--text)]'>
        <Link
          to={`/modules/${selectedModule.id}`}
          className='inline-flex items-center gap-2 hover:text-[var(--text-h)] hover:underline'
        >
          <ArrowLeft size={16} aria-hidden='true' />
          Back to {selectedModule.name}
        </Link>
      </nav>

      <header className='course-header mb-8 grid gap-6 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--accent-bg)] p-6 shadow-[var(--shadow)] sm:p-8 lg:grid-cols-[1fr_15rem] lg:items-end'>
        <div>
          <p className='mb-3 text-xs font-black uppercase tracking-[0.2em] text-[var(--accent-bold)] dark:text-[var(--accent)]'>
            {selectedModule.name} · Learning path
          </p>
          <h1 className='max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-[var(--text-h)] sm:text-6xl'>
            {displayedCourse.title}
          </h1>
          <p className='mt-4 max-w-2xl text-lg leading-relaxed text-[var(--text)]'>
            {displayedCourse.description}
          </p>
          <div className='mt-5 flex flex-wrap items-center gap-4 text-sm font-semibold text-[var(--text-h)]'>
            <span className='inline-flex items-center gap-2'>
              <BookOpen size={17} aria-hidden='true' />
              {selectedModule.lessons.length} paths in this module
            </span>
            {duration && <span>{duration} minutes</span>}
          </div>
        </div>
        <div className='hidden rounded-2xl border border-white/20 bg-black/10 p-5 text-white backdrop-blur-md lg:block'>
          <Sparkles
            size={24}
            className='mb-5 text-[#d8ff74]'
            aria-hidden='true'
          />
          <p className='text-sm font-semibold leading-relaxed'>
            Start with the idea, then make it yours in the practice paths.
          </p>
        </div>
      </header>

      {briefLesson && <BriefLesson lesson={briefLesson} />}

      <section id='practice' className='mt-10 scroll-mt-24'>
        <div className='flex flex-wrap items-end justify-between gap-4'>
          <div>
            <p className='text-xs font-black uppercase tracking-[0.2em] text-[var(--accent-bold)] dark:text-[var(--accent)]'>
              Learning paths
            </p>
            <h2 className='mt-2 text-3xl font-semibold tracking-tight text-[var(--text-h)]'>
              Put the idea into action
            </h2>
            <p className='mt-2 max-w-2xl text-[var(--text)]'>
              Pick a path, test your understanding, and come back to the quick
              lesson whenever you need the idea again.
            </p>
          </div>
          {isLoading && (
            <span className='text-sm text-[var(--text)]'>
              Syncing course library…
            </span>
          )}
        </div>

        <div className='mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {practiceItems.map((item, index) => (
            <button
              key={item.key}
              type='button'
              aria-pressed={activeItem?.key === item.key}
              onClick={() =>
                setActivePath({ context: pathContext, key: item.key })
              }
              className='group flex min-h-44 flex-col rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-[var(--accent-border)] hover:shadow-[var(--shadow)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]'
            >
              <div className='flex w-full items-center justify-between gap-3'>
                <span className='rounded-full bg-[var(--accent-bg)] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[var(--accent-bold)] dark:text-[var(--accent)]'>
                  {item.label}
                </span>
                <span className='text-sm font-black text-[var(--text)] opacity-50'>
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className='mt-5 text-xl font-semibold text-[var(--text-h)]'>
                {item.title || item.text}
              </h3>
              <p className='mt-2 line-clamp-3 text-sm leading-relaxed text-[var(--text)]'>
                {item.text}
              </p>
              <span className='mt-auto inline-flex items-center gap-2 pt-5 text-sm font-bold text-[var(--accent-bold)] dark:text-[var(--accent)]'>
                Open path
                <ArrowRight
                  size={16}
                  className='transition-transform group-hover:translate-x-1'
                  aria-hidden='true'
                />
              </span>
            </button>
          ))}
        </div>

        {activeItem && (
          <div className='mt-5 rounded-2xl border border-[var(--accent-border)] bg-[var(--accent-bg)] p-5 sm:p-6'>
            <p className='text-xs font-black uppercase tracking-[0.18em] text-[var(--accent-bold)] dark:text-[var(--accent)]'>
              {activeItem.label}
            </p>
            <h3 className='mt-2 text-xl font-semibold text-[var(--text-h)]'>
              {activeItem.title || activeItem.text}
            </h3>
            <p className='mt-2 leading-relaxed text-[var(--text)]'>
              This path is ready for the full interactive activity. Keep the
              quick lesson nearby while you work through it.
            </p>
          </div>
        )}
      </section>

      <nav
        aria-label='Course navigation'
        className='mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border)] pt-5'
      >
        {previousLesson ? (
          <Link
            to={`/modules/${selectedModule.id}/course/${previousLesson.id}`}
            className='inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--text-h)] transition hover:border-[var(--accent-border)] hover:bg-[var(--accent-bg)]'
          >
            <ArrowLeft size={16} aria-hidden='true' />
            Previous path
          </Link>
        ) : (
          <span />
        )}
        {nextLesson && (
          <Link
            to={`/modules/${selectedModule.id}/course/${nextLesson.id}`}
            className='inline-flex items-center gap-2 rounded-full bg-[var(--accent-bold)] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110'
          >
            Next path
            <ArrowRight size={16} aria-hidden='true' />
          </Link>
        )}
      </nav>
    </main>
  );
};

export default CoursePage;
