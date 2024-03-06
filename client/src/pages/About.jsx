import Footer from "../components/Footer"

export function About() {
  return (
    <>
      <div className="min-h-screen flex justify-center">
        <div className="max-w-2xl mx-auto p-3">
          <div>
            <h1 className="text-3xl font-semibold text-center m-7">Про &quot;Optima Municipality&quot;</h1>
            <div className="text-md text-gray-500 flex flex-col gap-6">
              <div className="flex gap-4 flex-col">
                <h2 className="text-xl font-semibold">Проект &quot;Optima Municipality&quot; втілення ваших ідей у життя!</h2>
                <p>
                  &quot;Optima Municipality&quot; - це платформа, створена для студентів дистанційного коледжу &quot;Optima Collage&quot;, де кожен може вільно ділитися своїми ідеями та пропозиціями щодо покращення навчального процесу. Ми віримо, що спільними зусиллями ми можемо зробити наш коледж ще кращим!
                </p>
              </div>
              <div className="flex gap-4 flex-col">
                <h2 className="text-xl font-semibold">
                  Чому варто використовувати &quot;Optima Municipality&quot;?
                </h2>
                <ul className="list-disc flex gap-2 flex-col">
                  <li><b>Вплив на розвиток коледжу:</b> Залишайте свої ідеї та пропозиції щодо покращення роботи коледжу, будь то нові курси, функції на сайті або будь-які інші аспекти. Ваша думка має значення!</li>
                  <li><b>Співпраця та спілкування:</b> Діліться своїми думками з іншими студентами, обговорюйте актуальні питання та знаходьте однодумців.</li>
                  <li><b>Відкритість та прозорість:</b> Кожен може бачити всі ідеї та пропозиції, а також стежити за їх статусом.</li>
                  <li><b>Постійний розвиток:</b> Ми постійно вдосконалюємо платформу &quot;Optima Municipality&quot; та додаємо нові функції, щоб зробити її ще більш зручною та корисною для вас.</li>
                </ul>
              </div>
              <div className="flex gap-4 flex-col">
                <h2 className="text-xl font-semibold">Що ви можете робити на &quot;Optima Municipality&quot;?</h2>
                <ul className="list-disc flex gap-2 flex-col">
                  <li><b>Створити аккаунт:</b> Зареєструйтесь на платформі, щоб отримати доступ до всіх її можливостей.</li>
                  <li><b>Залишати ідеї та пропозиції:</b> Поділіться своїми думками щодо того, як можна покращити наш коледж.</li>
                  <li><b>Обговорювати та коментувати:</b> Висловлюйте свою думку з приводу інших ідей та пропозицій, спілкуйтесь з іншими студентами.</li>
                  <li><b>Голосувати за ідеї:</b> Підтримуйте ідеї, які вам подобаються, щоб допомогти їм втілитися в життя.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
