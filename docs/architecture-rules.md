# Bare Minimum rules

The bare minimum principles represent ideas that help any developer interpret designs and code in simple perspectives and approaches. The bare minimums help us keep the eye on the ball.

The value that it brings is that you will create synergy with your team, your tools, and your future self — by writing code that speaks the language of clarity, consistency, and shared understanding.

## Core Principles

- **Respect The Framework's Model (RTFM principle)**
- **Coding For Clarity (C4C principle)**
- **Code for Inclusivity (C4I principle)**
- **Keep it simple stupid (KISS principle)**
- **You aren't gonna need it (YAGNI principle)**
- **Hide Implementation, Present Interface (HIPI principle)**
- **Naming by Intention (NBI principle)**
- **In Defense of Craft — But Default to the Principle**

## Respect The Framework's Model (RTFM principle)

Follow the JEDI path of framework harmony:

- **J**ust use the docs
- **E**mbrace idioms
- **D**on't override conventions
- **I**ntegrate, don't isolate

**Example**: If you use React, use the hooks patterns. If you use SpringBoot, stick to recommended module structure.

## Coding For Clarity (C4C principle)

It is said that 80% of programming is reading and understanding (other people's) code. This cheat sheet is a brief overview of ideas you can use to write code that is easier to read.

Love like there's no tomorrow, dance like no one can see you, and write code in such a way that you imagine that the next programmer who's going to inherit your code is the BOFH; a psychopathic mass murderer who knows your home address.

Some people say 'Write code for stupid developers' which is the short version of above; but we can't write that in an article, can we? 😉

## Code for Inclusivity (C4I principle)

Make sure non-participants are easily onboarded.

This is an extension of the C4C principle and will frame you in the right context. If someone that doesn't know the framework you are working on, was not on the project from the start you can make your code accessible for non-participants by:

- Keeping the folder structure clear (features together first, over types together first)
- Keeping your code greppable - you should be able to see a function without the need for scroll (no vertically, horizontally)
- Document what is necessary
- RFC: README.md context standardized for projects

## Keep it simple stupid (KISS principle)

Simplicity is not a lack of power — it's clarity by design. Don't do premature optimizations: Avoid building layers of abstraction, options, or configurations "just in case." Default to the dumbest version that works well — and only then add sophistication with purpose.

**Practices:**

- If using documentation alone isn't enough to explain what your code does, it's too clever.
- Use least amount of abstractions.
- Don't build an engine when you need a tricycle — don't over engineer
- Hide details, yes — but don't hide the why.

## You aren't gonna need it (YAGNI principle)

You aren't gonna need it - a principle of extreme programming. Also accidental complexity A classic XP principle.

- Don't build it until it's needed
- Don't write speculative abstractions
- Don't generalize without a second use case
- Don't prematurely optimize

Accidental complexity refers to challenges that developers unintentionally make for themselves as a result of trying to solve a problem. (Fortunately, this kind of complexity can also be fixed or improved by developers.) — refactor early.

## Hide Implementation, Present Interface (HIPI principle)

Information Hiding - Read: implementation hiding - the concept of writing a clear API so the implementation is hidden and you don't have to dive into the code to find out what it is doing.

Encapsulation is not just an OOP thing; it's a universal best practice: Hide implementation details behind clear interfaces.

- Prevents tight coupling
- Makes refactoring safer
- Enables better testability
- Enhances readability

```javascript
// 🤔 *meh*
if (user.age > 18 && user.isActive && !user.isBanned) { ... }

// ✅ Better
if (user.canAccessDashboard()) { ... }
```

## Naming by Intention (NBI principle)

"There are only two hard things in Computer Science: cache invalidation and naming things." – Phil Karlton

Good names act as documentation. Aim for clarity over cleverness. A well-named variable or function is a contract of intent and reads like mundane English.

For naming code that goes fast and reads well (NITRO):

- **N**ame by intention
- **I**mply types
- **T**ell truth about behavior
- **R**eflect domain logic
- **O**ptimize for clarity

### Examples

**Name by Intention**: Names should reflect what the variable/function represents in the business domain, not how it's computed.

```javascript
// 🤔 Meh
const value = getConfigSetting();

// ✅ Better
const shouldShowOnboarding = featureFlags.showOnboarding;
```

**Imply Types**: A good name makes the expected type clear without needing to peek at its declaration.

```javascript
// 🤔 Meh
const data = fetchData();

// ✅ Better
const userList: User[] = fetchUsers();
```

**Tell truth about Behavior**: Clarify whether something returns a value (query) or performs a side effect (command).

```javascript
// 🤔 Meh
user.accessDashboard();

// ✅ Better
user.canAccessDashboard(); // ← query (returns boolean)
user.openDashboard();      // ← command (performs action)
```

**Reflect Domain Logic**: Don't name things like a generic tool; name them as actors in your system.

```javascript
// 🤔 Meh
const isValid = check(data);

// ✅ Better
const isPaymentAuthorized = payment.validateCreditCard();
```

**Optimize for Clarity**: Clear is better than short. Remove double negatives, be consistent with naming patterns.

```javascript
// 🤔 Meh
if (!user.isNotSuspended) { ... }

// ✅ Better
if (user.isSuspended) { ... }

// ✅ Even better
if (user.canLogin) { ... }
```

## In Defense of Craft — But Default to the Principle

Principles like KISS, YAGNI, and RTFM are here for a reason: they codify pain learned the hard way. They help us write maintainable code that plays well with others. But like any guideline, they're not laws — they're lighthouses. You follow them by default, and deviate only when you truly understand the rocks beneath the surface.

Some developers often want to "innovate" by rewriting things their own way. This leads to personal patterns no one else understands, tight coupling, or unnecessary complexity. If you're not yet fluent in the idioms of your framework or language, you're not rebelling — you're just improvising jazz without knowing the scales. It causes inconsistencies, and increases the WTF/minute with your coworkers. When in doubt, follow the principle. And else, at least document what you do: why — what — how.

But mastery changes the equation. Once you deeply understand a principle — what it's protecting you from, and when it's overreaching — then, and only then, does breaking it become a deliberate choice. At that point, violating KISS might actually lead to clearer domain modeling. Bending RTFM might make your architecture more composable.

Craft lies in knowing the difference between breaking a rule because you need to — and breaking it because you don't understand it.

So yes, embrace principles. They'll save you from future pain. And over time, you'll learn that the best engineers aren't those who never break the rules — but those who know when not to. 