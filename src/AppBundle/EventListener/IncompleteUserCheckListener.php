<?php

/*
 * This file is part of the Sententiaregum project.
 *
 * (c) Maximilian Bosch <maximilian.bosch.27@gmail.com>
 * (c) Ben Bieler <benjaminbieler2014@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

declare(strict_types=1);

namespace AppBundle\EventListener;

use AppBundle\Model\User\Provider\BlockedAccountReadInterface;
use AppBundle\Model\User\User;
use Ma27\ApiKeyAuthenticationBundle\Event\OnAuthenticationEvent;
use Ma27\ApiKeyAuthenticationBundle\Exception\CredentialException;

/**
 * Hook which observes the authentication and stops the authentication process if the user is
 * not approved or locked or blocked due to suspicious activity.
 *
 * @author Maximilian Bosch <maximilian.bosch.27@gmail.com>
 */
class IncompleteUserCheckListener
{
    /**
     * @var BlockedAccountReadInterface
     */
    private $temporaryBlockedAccountProvider;

    /**
     * Constructor.
     *
     * @param BlockedAccountReadInterface $blockedAccountProvider
     */
    public function __construct(BlockedAccountReadInterface $blockedAccountProvider)
    {
        $this->temporaryBlockedAccountProvider = $blockedAccountProvider;
    }

    /**
     * Validates the user during the authentication process.
     *
     * @param OnAuthenticationEvent $event
     *
     * @throws CredentialException If the user is locked
     */
    public function validateUserOnAuthentication(OnAuthenticationEvent $event)
    {
        /** @var User $user */
        $user = $event->getUser();

        $isLocked      = $user->isLocked();
        $isNonApproved = $user->getActivationStatus() !== User::STATE_APPROVED;

        if ($isLocked || $isNonApproved || $this->temporaryBlockedAccountProvider->isAccountTemporaryBlocked($user->getId())) {
            switch (true) {
                case $isNonApproved:
                    $message = 'BACKEND_AUTH_NON_APPROVED';
                    break;
                case $isLocked:
                    $message = 'BACKEND_AUTH_LOCKED';
                    break;
                default:
                    $message = 'BACKEND_AUTH_BLOCKED';
            }

            throw new CredentialException($message);
        }
    }
}
